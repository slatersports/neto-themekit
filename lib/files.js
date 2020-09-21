const path = require('path')

module.exports = {
	getProjectDirectory: () => {
		return require.main.paths[0].split("node_modules")[0].slice(0, -1);
    },
    getRemoteThemeDirectory: (theme) => {
        return path.join('httpdocs/assets/themes', theme)
    }
};
