const Net = require('net');
const server = new Net.Server();
const serverUtils = require("./utils/serverManager").start();

module.exports = class OpenTouchPortal {
    constructor(...args) {
        if(typeof args[0] === 'object'){
            this.pingable = !!args[0].pingable;
            this.port = args[0].port || 12135;
        }
        else if(typeof args[0] === 'number'){
            this.port = args[0] || 12135;
        }
    }
    start() {
        server.listen(this.port, function() {
            console.log(`[Server] localhost:${port}`);
        });
        server.on('connection', (socket) => {
            socket.setEncoding('utf8');
            socket.on('data', function(chunk) {
                const parsedChunk = parser(chunk);
                if(!parsedChunk) serverUtils.parseCustomMessage(socket, chunk.toString());
                else {
                }

            })
        })
        return this;
    }

}
