#!/usr/bin/env node
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
		},
		handler: require("./bin/configure"),
	})
	.command({
		command: "download [directory]",
		desc: "Download theme",
		handler: require("./bin/download"),
	})
	.command({
		command: "deploy [directory]",
		desc: "Deploy theme",
		handler: require("./bin/deploy"),
	})
	.command({
		command: "watch [directory]",
		desc: "Watch for changes",
		handler: require("./bin/watch"),
	})
	.demandCommand()
	.help()
    .wrap(80)
    .argv;
