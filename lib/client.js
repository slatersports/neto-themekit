const SftpClient = require('ssh2-sftp-client')
const client = new SftpClient()

module.exports = {
    getInstance: () => {
        return client
    },
    connectClient: (username, password) => {
        return client.connect({
            port: '2022',
            host: 'sftp.neto.net.au',
            username,
            password
        })
    }
}