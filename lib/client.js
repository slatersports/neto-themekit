const SftpClient = require("ssh2-sftp-client");
const client = new SftpClient();

module.exports = {
	getInstance: () => {
		return client;
	},
	connectClient: async (username, password, theme) => {
		try {
			await client.connect({
				port: "2022",
				host: "sftp.neto.net.au",
				username,
				password,
			});
		} catch (e) {
			throw Error("failed to connect to sftp");
		}
	},
};
