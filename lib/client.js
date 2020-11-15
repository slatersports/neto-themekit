const SftpClient = require("ssh2-sftp-client");

module.exports = {
	connectClient: async (username, password, theme) => {
		try {
			const client = new SftpClient()
			await client.connect({
				port: "2022",
				host: "sftp.neto.net.au",
				username,
				password,
			});
			return client
		} catch (e) {
			throw Error("failed to connect to sftp");
		}
	},
};
