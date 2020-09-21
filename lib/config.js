const inquirer = require('inquirer');
const ConfigStore = require('configstore')
const pkg = require('../package.json')
const conf = new ConfigStore(pkg.name)

module.exports = {
    askSftpCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your SFTP username',
                validate: function(value) {
                    if (value.length) {
                        return true
                    } else {
                        'Please enter your username'
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your SFTP password',
                validate: function(value) {
                    if (value.length) {
                        return true
                    } else {
                        'Please enter your password'
                    }
                }
            }
        ]
        return inquirer.prompt(questions)
    },
    askTheme: () => {
        const questions = [
            {
                name: 'theme',
                type: 'input',
                message: 'Enter your theme name',
                validate: function(value) {
                    if (value.length) {
                        return true
                    } else {
                        'Please enter your theme name'
                    }
                }
            }
        ]
        return inquirer.prompt(questions)
    },
    storeSftpCredentials: (username, password) => {
        conf.set('sftp.username', username);
        conf.set('sftp.password', password);
    },
    getStoredSftpCredentials: () => ({
        username: conf.get('sftp.username'),
        password: conf.get('sftp.password')
    }),
    storeTheme: (theme) => {
        conf.set('theme.name', theme)
    },
    getTheme: () => ({
        name: conf.get('theme.name')
    })
}