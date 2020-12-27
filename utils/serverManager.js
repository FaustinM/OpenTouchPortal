const Net = require('net');
const port = 12134;
const server = new Net.Server();
const client = require("./clientManager");
let callbacks;

function parser(content) {
    let parsedRaw;
    try {
        parsedRaw = JSON.parse(content);
    } catch {
        return false
    }
    return {
        pro : parsedRaw.pUP,
        type : parsedRaw.pT,
        accessToken : parsedRaw.pAC,
        data : parsedRaw.pD,
        version : parsedRaw.v,
        appcode : parsedRaw.pAC,
        os : parsedRaw.pOS,
        orientation : parsedRaw.pSO,
        resX : parsedRaw.pRX,
        resY : parsedRaw.pRY,
        raw : {
            ...parsedRaw
        }
    }
}

function start() {
    server.listen(port, function() {
        console.log(`[Server] localhost:${port}`);
    });
    server.on('connection', function(socket) {
        console.log(`[Server] New connection from ${socket.remoteAddress}`);
        socket.setEncoding('utf8');

    })
}

function parseCustomMessage(socket, chunk) {
    switch(chunk.trim()) {
        case "pingtp": {
            console.log("[Server] PONG !")
            socket.write('{"COMMUNICATION_RESULT_CODE":1,"MIN_I":52,"COMMUNICATION_RESULT_EXRA_STRING":"pongtp","MIN_A":33}');
            break;
        }
        default: {
            console.log(chunk);
        }
    }
}

module.exports = {
    start
}
