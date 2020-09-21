module.exports = {
    getEnv: () => ({
        username: process.env.SFTP_USERNAME,
        password: process.env.SFTP_PASSWORD,
        theme: process.env.THEME_NAME
    })
}