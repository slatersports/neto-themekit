#!/usr/bin/env node

const chalk = require("chalk");

require("yargs")
	.command({
		command: "configure",
		desc: "Configure theme",
		builder: {
			username: {
				alias: "u",
				describe: "SFTP username",
				required: true,
				type: "string",
			},
			password: {
				alias: "p",
				describe: "SFTP password",
				required: true,
				type: "string",
			},
			theme: {
				alias: "t",
				describe: "Theme name",
				required: true,
				type: "string",
			},
			environment: {
				alias: "e",
				describe: "Environment",
				type: "string",
			},
		},
		handler: require("./bin/configure"),
	})
	.command({
		command: "download [theme]",
		desc: "Download theme",
		handler: require("./bin/download")
	})
	.command({
		command: "deploy",
		desc: "Deploy theme",
		handler: require("./bin/deploy"),
		builder: {
			environment: {
				alias: "e",
				describe: "Environment",
				type: "string",
			},
		},
	})
	.command({
		command: "watch",
		desc: "Watch for changes",
		handler: require("./bin/watch"),
		builder: {
			environment: {
				alias: "e",
				describe: "Environment",
				type: "string",
			},
		},
	})
	.fail((msg, err, yargs) => {
		if (err) {
			console.error(err)
		}
		console.error(chalk`{red ${msg}}`);
		process.exit(1);
	})
	.demandCommand()
	.help()
	.wrap(80).argv;
