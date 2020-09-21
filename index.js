#!/usr/bin/env node
require('yargs')
    .command({
        command: 'configure',
        desc: 'Configure theme',
        builder: {
            username: {
                alias: 'u',
                describe: 'sftp username',
                requiresArg: true
            },
            password: {
                alias: 'p',
                describe: 'sftp password',
                requiresArg: true
            }
        },
        handler: (argv) => {
            console.log('configuring')
        }
    })
    .command({
        command: 'download',
        desc: 'Download theme',
        handler: (argv) => {
            console.log('downloadin')
        }
    })
    .demandCommand()
    .help()
    .wrap(80)
    .argv