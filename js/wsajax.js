// This library is for automatically handling the connection between
// the server and the client utilizing the best transfer protocol
// available. The order of priority is WebSockets, MozWebSockets and
// Ajax. Example of usage:
//
//	var com		= io.connect("ws://localhost:9000/ws");
//

(function (window) {

    var io = (function () {
        if( ! (this instanceof con)) {
            return new con();
        }

        return this;
    })

    var init = (function () {
        try {
            method	= WebSocket || MozWebSocket ? true : false
        } catch(err) {
            console.log(err.type)
            io.prototype.WebSocketsEnabled = false
        }
        io.prototype.method =

    })();

    io.prototype = {
        connect: function(host) {
            this.method
        }
    }

    window.io = io
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
        // check if con exists
        conExists: function() {
            if(typeof(con)=="function") {
                return true;
            } else {
                return false;
            }
        }
    }

    // assign global variable
    window.runUnitTests = function() {
        return execTest(tests.conExists, "check if con exists") ? true : false;
    }

})();
