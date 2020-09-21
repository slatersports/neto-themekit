const chalk = require("chalk");
const client = require("../lib/client");
const config = require("../lib/config");
const files = require("../lib/files");
const log = console.log;

module.exports = async (argv) => {
	const { username, password, theme } = config.getConfig();
	await client.connectClient(username, password);
	const instance = client.getInstance();
	const onDownload = ({ source }) => {
		const relativePath = source.replace(files.getRemoteThemeDirectory(theme), '');
		log(`Downloaded file ${chalk.yellow(relativePath)}`);
	};
	instance.on("download", onDownload);
	await instance.downloadDir(files.getRemoteThemeDirectory(theme), argv.directory);
	instance.removeListener("download", onDownload);
	instance.end();
};
