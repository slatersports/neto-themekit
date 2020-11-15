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
			output = yaml.safeLoad(fs.readFileSync(configPath))
		}
		fs.writeFileSync(
			configPath,
			yaml.safeDump({
				...output,
				[environment]: {
					...output[environment],
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

		this.validateConfig(config);

		return config;
	},
	validateConfig: function (config) {
		Object.entries(config).forEach(([environment, config]) => {
			try {
				Object.entries(config).forEach(([key, value]) => {
					switch (key) {
						case 'username':
							if (typeof value !== 'string') {
								throw Error('username must be a string')
							}
							break;
						case 'password':
							if (typeof value !== 'string') {
								throw Error('password must be a string')
							}
							break;
						case 'theme':
							if (typeof value !== 'string') {
								throw Error('theme must be a string')
							}
							break;
						case 'ignore_files':
							if (!Array.isArray(value)) {
								throw Error('ignore_files must be an array')
							}
							break;
						case 'ignores':
							if (!Array.isArray(value)) {
								throw Error('ignores must be an array')
							}
							break;
						default:
							break
					}
				})
			} catch (e) {
				throw Error(`invalid config in environment ${environment}: ${e}`)
			}
		})
	}
};
