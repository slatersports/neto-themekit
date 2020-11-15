const chalk = require("chalk");
const glob = require("glob");
const Bottleneck = require("bottleneck/es5");
const client = require("../lib/client");
const config = require("../lib/config");
const files = require("../lib/files");
const date = require("../lib/date");

const log = console.log;

module.exports = async ({ environment = "production" }) => {
	const { username, password, theme } = config.getConfig(environment);

	const connect = () => client.connectClient(username, password);

	const limiter = new Bottleneck({
		maxConcurrent: 5,
		trackDoneStatus: true
	});

	const srcDirectory = files.getWorkingDirectory();
	const destDirectory = files.getRemotePath(theme);

	const globFiles = () =>
		new Promise((resolve, reject) => {
			glob(
				"**",
				{
					ignore: ["ntheme.yaml"],
					root: srcDirectory,
					nodir: true,
					absolute: true,
				},
				(err, files) => {
					if (err) {
						reject(err);
					}
					resolve(files);
				}
			);
		});

		const logDate = () => {
			return chalk.blue(date.formatDateTime(new Date()));
		};

	try {
		const initClient = await connect()
		const destExists = await initClient.exists(destDirectory);
		if (!destExists) {
			await initClient.mkdir(destDirectory, true);
		}
		initClient.end()

		const globbedFiles = await globFiles();
		limiter.on("done", (info) => {
			const { DONE } = limiter.counts()

			const relativePath = files.getRelativePath(info.args[0])
			

			log(`${logDate()} ${chalk.yellow(`${DONE}/${globbedFiles.length}`)} uploaded file ${chalk.green(relativePath)}`) 
		})
		await Promise.all(
			globbedFiles.map(async (file) => {
				const remotePath = files.getRemotePath(theme, files.getRelativePath(file));

				return limiter.schedule(async (local, remote) => {
					const putClient = await connect()
					await putClient.fastPut(local, remote)
					await putClient.end()
				}, file, remotePath);
			})
		);

		log(chalk.green(`deployed`));
	} catch (e) {
		throw Error(`failed to deploy: ${e}`);
	}
};
