const chalk = require("chalk");
const chokidar = require("chokidar");
const client = require("../lib/client");
const config = require("../lib/config");
const files = require("../lib/files");
const date = require("../lib/date");

const log = console.log;

module.exports = async ({ environment }) => {
	const { username, password, theme } = config.getConfig(environment);
	await client.connectClient(username, password);
	const instance = client.getInstance();
	const watcher = chokidar.watch(files.getWorkingDirectory(), {
		ignored: /ntheme.yaml/,
	});

	const logDate = () => {
		return chalk.blue(date.formatDateTime(new Date()));
	};

	const onFileChange = async (path) => {
		const relativePath = files.getRelativePath(path);
		const folder = relativePath.split("/").slice(0, -1).join("/");
		log(`${logDate("blue")} processing file ${chalk.green(relativePath)}`);
		try {
			const folderExists = await instance.exists(folder);
			if (!folderExists) {
				await instance.mkdir(folder, true);
			}
			await instance.fastPut(path, files.getRemotePath(theme, relativePath));
			log(`${logDate("blue")} uploaded file ${chalk.green(relativePath)}`);
		} catch (e) {
			log(`${logDate("red")} could not process file ${chalk.red(relativePath)}`);
		}
	};

	const onFileDelete = async (path) => {
		const relativePath = files.getRelativePath(path);
		log(`${logDate()} processing file ${chalk.green(relativePath)}`);
		try {
			await instance.delete(files.getRemotePath(theme, relativePath));
			log(`${logDate()} deleted file ${chalk.green(relativePath)}`);
		} catch (e) {
			log(`${logDate()} could not delete file ${chalk.red(relativePath)}`);
		}
	};

	const onDirAdd = async (path) => {
		const relativePath = files.getRelativePath(path);
		log(`${logDate()} processing dir ${chalk.green(relativePath)}`);
		try {
			await instance.mkdir(files.getRemotePath(theme, relativePath), true);
			log(`${logDate()} created directory ${chalk.green(relativePath)}`);
		} catch (e) {
			log(`${logDate()} could not create directory ${chalk.red(relativePath)}`);
		}
	};

	const onDirDelete = async (path) => {
		const relativePath = files.getRelativePath(path);
		log(`${logDate()} processing dir ${chalk.green(relativePath)}`);
		try {
			await instance.delete(files.getRemotePath(theme, relativePath));
			log(`${logDate()} deleted directory ${chalk.green(relativePath)}`);
		} catch (e) {
			log(`${logDate()} could not delete directory ${chalk.red(relativePath)}`);
		}
	};

	const onReady = async () => {
		log(`${logDate()} watching current directory for changes`);
		watcher
			// file changes
			.on("add", onFileChange)
			.on("change", onFileChange)
			.on("unlink", onFileDelete)
			// directory changes
			.on("addDir", onDirAdd)
			.on("unlinkDir", onDirDelete);
	};

	watcher.on("ready", onReady);

	["SIGINT", "SIGTERM"].forEach((sig) => {
		process.on(sig, async () => {
			log(`${logDate()} stopping process`);
			try {
				await Promise.all([instance.end(), watcher.removeAllListeners()]);
			} catch (e) {}
			process.exit();
		});
	});
};
