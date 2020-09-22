const config = require("../lib/config");

module.exports = ({ username, password, theme, environment }) => {
	config.writeConfig(username, password, theme, environment);
};
