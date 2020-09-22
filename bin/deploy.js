const os = require("os");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const client = require("../lib/client");
const config = require("../lib/config");
const files = require("../lib/files");

const log = console.log;

module.exports = async ({ environment = "production" }) => {
	const { username, password, theme } = config.getConfig(environment);
	await client.connectClient(username, password);

	const instance = client.getInstance();

	const srcDirectory = files.getWorkingDirectory();
	const destDirectory = files.getRemotePath(theme);

	const tempDirectory = destDirectory + "-temp";
	const oldDirectory = destDirectory + `-${new Date().getTime()}`;

	const tmpConfigPath = path.join(os.tmpdir(), "ntheme.yaml");

	try {
		const destExists = await instance.exists(destDirectory);
		const uploadSpinner = ora("uploading theme");
		fs.renameSync(config.getConfigPath(), tmpConfigPath);
		if (!destExists) {
			await instance.mkdir(destDirectory, true);
			uploadSpinner.start();
			await instance.uploadDir(srcDirectory, destDirectory);
			uploadSpinner.stop();
		} else {
			await instance.mkdir(tempDirectory, true);
			uploadSpinner.start();
			await instance.uploadDir(srcDirectory, tempDirectory);
			uploadSpinner.stop();
			await instance.rename(destDirectory, oldDirectory);
			await instance.rename(tempDirectory, destDirectory);
		}
		fs.renameSync(tmpConfigPath, config.getConfigPath());
		log(chalk.green(`deployed`));
	} catch (e) {
		throw Error("failed to deploy");
	}
	instance.end();
};
