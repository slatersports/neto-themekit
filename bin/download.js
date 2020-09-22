const chalk = require("chalk");
const client = require("../lib/client");
const config = require("../lib/config");
const files = require("../lib/files");
const { formatTime } = require("../lib/date");
const log = console.log;

module.exports = async ({ theme }) => {
	const environmentConfig = config.getConfig();
	const { username, password } = environmentConfig;
	await client.connectClient(username, password);
	const instance = client.getInstance();
	const onDownload = ({ source }) => {
		const relativePath = source.replace(files.getRemotePath(theme), "");
		log(`${chalk.blue(formatTime(new Date()))} downloaded file ${chalk.yellow(relativePath)}`);
	};
	instance.on("download", onDownload);
	await instance.downloadDir(files.getRemotePath(theme), files.getWorkingDirectory());
	instance.removeListener("download", onDownload);
	instance.end();
};
