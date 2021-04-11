require('dotenv');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports = {
    env: process.env.NODE_ENV,
    port: normalizePort(process.env.PORT || '3000'),
    mongoose: {
        url: process.env.MONGOOSE_CONNECTION_URL,
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }
}