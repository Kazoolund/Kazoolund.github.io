"use strict"

let webSocketServer = require("websocket").server;
let http = require("http");
let webSocketServerPort = 2345;
let server = http.createServer(function(request, response){
    //Support
});

server.listen(webSocketServerPort, function(){
    console.log((new Date()) + "Server listening on port: " + webSocketServerPort);
})

let wsServer = new webSocketServer({
    httpServer: server
})

wsServer.on("request", (request) => {
    console.log((new Date()) + "Connection from origin" + request.origin + ".");
    let connection = request.accept(null, request.origin);
    console.log((new Date()) + "Connection accepted.");
    connection.on("message", function(message){
        console.log(JSON.stringify(message));
        connection.sendUTF(message.utf8Data);
    })
})