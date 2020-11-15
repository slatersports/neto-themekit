const chalk = require("chalk");
const glob = require("glob");
const Bottleneck = require("bottleneck/es5");
const path = require("path");
const fs = require('fs')
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
		trackDoneStatus: true,
	});

	const srcDirectory = files.getWorkingDirectory();
	const remoteDirectory = files.getRemotePath(theme)

	const globFiles = () =>
		new Promise((resolve, reject) => {
			glob(
				"**",
				{
					ignore: ["ntheme.yaml"],
					root: srcDirectory,
					nodir: true,
					absolute: true
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
		const dirClient = await connect()
		const themeDirExists = await dirClient.exists(remoteDirectory)
		if (!themeDirExists) {
			dirClient.mkdir(remoteDirectory, true)
		}
		dirClient.end()
		const globbedFiles = await globFiles();
		limiter.on("done", (info) => {
			const { DONE } = limiter.counts();
			const relativePath = files.getRelativePath(info.args[0]);
			log(
				`${logDate()} ${chalk.yellow(`${DONE}/${globbedFiles.length}`)} uploaded file ${chalk.green(
					relativePath
				)}`
			);
		});
		await Promise.all(
			globbedFiles.map(async (localFilePath) => {
				const dir = path.dirname(localFilePath);
				const remoteDirPath = files.getRemotePath(theme, files.getRelativePath(dir));
				const remoteFilePath = files.getRemotePath(theme, files.getRelativePath(localFilePath));

				return limiter.schedule(
					async (localFilePath, remoteDirPath, remoteFilePath) => {
						const putClient = await connect();
						const dirExists = await putClient.exists(remoteDirPath)
						if (!dirExists) {
							await putClient.mkdir(remoteDirPath, true);
						}
						await putClient.fastPut(localFilePath, remoteFilePath);
						await putClient.end();
					},
					localFilePath,
					remoteDirPath,
					remoteFilePath
				);
			})
		);
		log(chalk.green(`deployed`));
	} catch (e) {
		throw Error(`failed to deploy: ${e}`);
	}
};
