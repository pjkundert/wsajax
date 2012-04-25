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
    })

    var init = (function () {
        try {
            websockets		= WebSocket || MozWebSocket ? true : false
            method		= WebSocket ? "WebSocket" : MozWebSocket ? "MozWebSocket" : "Ajax";
        } catch(err) {
            console.log(err.type)
        }
        console.log(method)
        console.log(websockets)
        wsajax.prototype.method		= method
        wsajax.prototype.websockets	= websockets
    })();

    wsajax.prototype = {
        connect: function(host) {
            console.log(this.method)
            console.log("ws = new "+this.method+"("+host+")")
            return this
        }
    }
    wsajax.connect = function (host) {
        return wsajax().connect(host)
    }

    window.wsajax = wsajax
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
