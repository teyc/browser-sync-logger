/**
 * This module sends all console error logs to the
 * terminal running browser sync
 * 
 * in bs-.config.js, set 
 * module.exports = {
 *   ...
 *   "plugins": ["browser-sync-logger"],
 *   ...
 * }
 **/
var browserSync = require('browser-sync');
var logger = require('eazy-logger');

/**
 * Browser-sync plugins implement a plugin() function
 * and optionally a hooks attribute that provide data
 * or callbacks that are called by hooks
 **/
module.exports.plugin = function (server, client, bs) {

    var logger2 = logger.Logger({prefix:'[{red:ERROR}] '});

    function handleError(argsObject) {
        /* logs to _our_ terminal */
        var argsArray = Object.keys(argsObject).map(key => argsObject[key]);
        if (argsArray[0] instanceof Object) {
            /* eazylogger treats braces in the first argument
            ** as console coloring directive. 
            ** We insert a string to avoid breaking eazy-logger
            */
            argsArray.unshift('');
        }
        logger2.error.apply(logger2, argsArray);
    }

    function handleConnect(client) {
        client.on("console:error", handleError);
    }

    client.io.sockets.on("connect", handleConnect);

}

module.exports.hooks = {
    "client:js": [
        "(function(console) {",
        "/* send error logs to terminal */",
        "var oldLog = console.error;  ",
        "console.error = function () { ",
        "  ___browserSync___.socket.emit('console:error', arguments); ",
        "  console.log.apply(console, arguments);",
        "  oldLog.apply(console, arguments); ",
        "};",
        "})(console);"
    ].join("\n")
}

