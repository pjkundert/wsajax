// This library is for automatically handling the connection between
// the server and the client utilizing the best transfer protocol
// available. The order of priority is WebSockets, MozWebSockets and
// Ajax. Example of usage:
//
//	var com		= wsajax.connect("ws://localhost:9000/ws");
//

(function (window) {

    var wsajax = {};
    // constructor for wsajax
    (function () {
        var method, websockets;

        // error logging function for Chrome and Firefox
        var logError = function(err) {
            if(typeof(err)=="object") {
                if(err.message) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            }
        }

        // first check if MozWebSocket is defined Firefox
        try {
            method			= MozWebSocket ? "MozWebSocket" : false;
            websockets			= true;
        } catch(err) {
            logError(err);

            // then check if WebSocket is defined for Chrome
            try {
                method			= WebSocket ? "WebSocket" : false;
                websockets		= true;
            } catch(err) {
                logError(err);

                // default to ajax for all other platforms
                method			= "Ajax";
                websockets		= false;
            }
        }

        // set values on the wsajax object
        wsajax.method			= method;
        wsajax.websockets		= websockets;
        wsajax.websockets		= false;
    })();

    // connect function usage: wsajax.connect()
    wsajax.connect = function (config) {
        config			= config ? config : {}
        if(this.websockets) {
            // if websocket host is undefined set host to ...
            this.host		= config.webSocketHost
                ? config.webSocketHost
                : "ws://localhost:8600/api";
            this.connection	= eval("new "+wsajax.method+"('"+host+"');");
            return this;
        } else {
            // if websocket host is undefined set host to ...
            this.host		= config.ajaxHost
                ? config.ajaxHost
                : "http://localhost:8600/api";

            console.log("start ajax polling...")
            this.connection	= this.ajax();
            return this;
        }
    }

    // ajax object
    wsajax.ajax = function() {
        this.ajax.longPoll.call(this)
    }
    wsajax.ajax.longPoll = function() {
        console.log(this)
        jQuery.ajax({
            url: this.host,
            type: "GET",
            dataType: "jsonp",
//            dataType: "html",
            complete: function() {
                console.log("started ajax polling...");
            },
            success:  function(data) {
                console.log("recieved message... "+data);
                //wsajax.ajax.longPoll(this.host);
            },
            error:  function(jxhr, msg) {
                console.log("Error: "+msg);
            }
        })
    }

    // send message
    wsajax.send = function(msg) {
        if(this.websockets) {
            this.connection.send('{ "callback": "random", "method": "'+msg+'" }')
        } else {
        }
    }

    // set window variable for global use
    window.wsajax = wsajax;

})(window);
