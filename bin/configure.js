const config = require("../lib/config");

module.exports = (argv) => {
	const { username, password, theme } = argv;
	config.writeConfig(username, password, theme);
};
