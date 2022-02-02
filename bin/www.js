var Config = require("../config");
var MessageHelper = require("../utils/message_helper");

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('node-hongyanasst:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = Config.port;
app.set('port', Config.port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
server.on("request", function (req, res) {
    console.log(req.headers);
    if (req.headers["auth-token"] !== Config.auth_token || req.headers["app-flag"] !== Config.app_flag) {
        console.log("false");
        res.json({
            code: 5000,
            msg: MessageHelper.login_unauthorized
        });
    }
});

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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
