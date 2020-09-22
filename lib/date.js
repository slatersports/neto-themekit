const format = require("date-fns/format")

module.exports = {
    formatTime: (date) => {
        return format(date, "HH:mm:SS")
    },
    formatDateTime: (date) => {
        return format(date, "yyyy-MM-dd'T'HH:mm:SS")
    }
}