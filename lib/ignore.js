const files = require("./files");
const path = require("path");
const fs = require("fs");

module.exports = {
	getConfigIgnorePatterns: (config) => {
		const { ignore_files, ignores } = config

		const configIgnorePatterns = [];

		if (ignore_files) {
			configIgnorePatterns.push(...ignore_files);
		}

		if (ignores) {
			configIgnorePatterns.push(
				ignores.reduce((acc, ignoreFile) => {
					const ignorePatterns = this.readIgnoreFile(ignoreFile);
					acc.push(...ignorePatterns);
					return acc;
				}, [])
			);
        }
        
        return configIgnorePatterns
	},
	readIgnoreFile: (ignoreFile) => {
		const absolutePath = path.resolve(files.getWorkingDirectory(), ignoreFile);

		const ignorePatterns = [];

		if (fs.existsSync(absolutePath)) {
			const file = fs.readFileSync(absolutePath, { encoding: "utf-8" });

			file.split("\n").forEach((line) => {
				if (line.trimStart().startsWith("#")) {
					return;
				}
				ignorePatterns.push(line);
			});
		}

		return ignorePatterns;
	},
};
