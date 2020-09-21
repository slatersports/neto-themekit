const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const files = require("./files");

module.exports = {
	getConfigPath: function () {
		return path.join(files.getProjectDirectory(), "ntheme.yaml");
	},
	writeConfig: function (username, password, theme) {
		fs.writeFileSync(
			this.getConfigPath(),
			yaml.safeDump({
				username,
				password,
				theme,
			})
		);
	},
	getConfig: function () {
		if (!fs.existsSync(this.getConfigPath())) {
			throw Error("must run ntheme configure first");
		}
		return yaml.safeLoad(fs.readFileSync(this.getConfigPath()));
	},
};
