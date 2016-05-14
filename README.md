browser-sync-logger
---------------------

This browser-sync plugin sends all console error logs to the
terminal running browser sync
 
Launch from command line
-------------------------------------

    npm install browser-sync-logger

    node_modules/.bin/browser-sync start \
      --server . \
      --plugins browser-sync-logger

Launch with configuration file
--------------------------------------

in bs-config.js, set 

    module.exports = {
      ...
      "plugins": ["browser-sync-logger"],
      ...
    }

Running

    browser-sync start --server -c bs-config.js

and then in your client script, try

    console.error("Condition", 
        {"status": "awesome"});

