const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const files = require("./files");

module.exports = {
	getConfigPath: function () {
		return path.join(files.getWorkingDirectory(), "ntheme.yaml");
	},
	writeConfig: function (username, password, theme, environment = "development") {
		const configPath = this.getConfigPath();
		let output = {};
		if (fs.existsSync(configPath)) {
			output = fs.readFileSync(configPath);
		}
		fs.writeFileSync(
			configPath,
			yaml.safeDump({
				...output,
				[environment]: {
					username,
					password,
					theme,
				},
			})
		);
	},
	getConfig: function (environment = "development") {
		const configPath = this.getConfigPath();
		if (!fs.existsSync(configPath)) {
			throw Error("must run ntheme configure first");
		}
		const config = yaml.safeLoad(fs.readFileSync(configPath))[environment];
		if (!config) {
			throw Error("no config for this environment");
		}
		return config;
	},
};
