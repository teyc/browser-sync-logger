browser-sync-logger
---------------------

This browser-sync plugin sends all console error logs to the
terminal running browser sync.

Browser-sync Plugin
---------------------

This is a minimal example of how to write a browser-sync plugin.
A browser-sync plugin exports a function called `plugin()`. This 
will be called upon activation.

A browser-sync plugin can also provide data or functions to 
predefined hooks. In this project, we export hooks/client:js.
This piece of string is concatenated with other 'client:js' 
hooks and executed on the browser.

This plugin also demonstrates browser-to-server communication
via sockets. The browser can emit events using

    ___browserSync___.socket.emit(eventName, someObject);

The server registers interest in client events via

    client.io.sockets.on("connect", 
        function (newClient) {
            newClient.on("my.event", function () {
                ...
                }));
      
 
Launch from command line
-------------------------------------

    npm install browser-sync-logger

    node_modules/.bin/browser-sync start \
      --server . \
      --plugins browser-sync-logger

(alternatively) Launch with configuration file
--------------------------------------

in bs-config.js, set 

    module.exports = {
      ...
      "plugins": ["browser-sync-logger"],
      ...
    }

Next, start browser-sync

    browser-sync start --server -c bs-config.js

Example
-----------

In your client script, try

    console.error("auth", 
        {"reason": "token validation failed."});

in the terminal that launched browser-sync, you
should see

   [ERROR] auth {reason: 'token validation failed'}

