// This library is for automatically handling the connection between
// the server and the client utilizing the best transfer protocol
// available. The order of priority is WebSockets, MozWebSockets and
// Ajax. Example of usage:
//
//	var com		= wsajax.connect("ws://localhost:9000/ws");
//

(function (window) {

    var wsajax = (function () {
        if( ! (this instanceof wsajax)) {
            return new wsajax();
        }
        return this;
    });

    // constructor for wsajax
    (function () {
        var method, websockets;

        // error logging function for Chrome and Firefox
        var logError = function(err) {
            if(typeof(err)=="object") {
                if(err.message) {
                    console.log(err.message)
                } else {
                    console.log(err)
                }
            }
        }

        // first check if MozWebSocket is defined Firefox
        try {
            method			= MozWebSocket ? "MozWebSocket" : false;
            websockets			= true
        } catch(err) {
            logError(err);

            // then check if WebSocket is defined for Chrome
            try {
                method			= WebSocket ? "WebSocket" : false;
                websockets		= true
            } catch(err) {
                logError(err);

                // default to ajax for all other platforms
                method			= "Ajax"
                websockets		= false
            }
        }

        // set values on the wsajax object
        wsajax.prototype.method		= method;
        wsajax.prototype.websockets	= websockets;
        wsajax.method			= method;
        wsajax.websockets		= websockets;
    })();

    // set window variable for global use
    window.wsajax = wsajax

    // connect function usage: wsajax().connect()
    wsajax.prototype.connect = function(host) {
        // if host is undefined set host to ...
        var host		= host ? host : "ws://localhost:9000/ws"
        var run			= "var ws = new "+this.method+"('"+host+"')"
        console.log(run)
        eval(run)
        return ws
    }

    // connect function usage: wsajax.connect()
    //   - need to make this work instead of wsajax().connect()
    // problem:
    //   - scope of this is wrong
    wsajax.connect = function (host) {
        // if host is undefined set host to ...
        var host		= host ? host : "ws://localhost:9000/ws"
        var run			= "var ws = new "+wsajax.method+"('"+host+"')"
        eval(run)
        return ws

        // bad fix for scope of this
//        return wsajax().connect.call(this(),host)
    }

})(window);



// Unit test logging
(function() {
    // test to see if script loaded
    console.log("connect.js has loaded")

    var execTest = function(test, msg) {
        var t	= test();
        var r	= t ? "\tSuccess" : "\t\t\t! FAILED";
        console.log(msg+":"+r);
        return t;
    }

    // object of tests
    var tests = {
        // check if wsajax exists
        conExists: function() {
            if(typeof(wsajax)=="function") {
                return true;
            } else {
                return false;
            }
        }
    }

    // assign global variable
    window.runUnitTests = function() {
        return execTest(tests.conExists, "check if wsajax exists") ? true : false;
    }

})();
