browser-sync-logger
---------------------

This browser-sync plugin sends all console error logs to the
terminal running browser sync
 
Configuration
---------------

in bs-config.js, set 

    module.exports = {
      ...
      "plugins": ["browser-sync-logger"],
      ...
    }

Running

    browser-sync start --server -c bs-config.js

and then in your client script, try

    console.error("This should show up in your terminal", {"status": "awesome"});

