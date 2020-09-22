const path = require("path");

module.exports = {
	getWorkingDirectory: function () {
		return process.cwd();
	},
	getRemotePath: function (theme, file = "") {
		return path.join("httpdocs/assets/themes", theme, file);
	},
	getRelativePath: function (file) {
		return file.replace(this.getWorkingDirectory(), "");
	},
};
