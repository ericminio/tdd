const http = require('http');
const sockets = [];

const { servingAssets } = require('./serving-assets');
const server = http.createServer(servingAssets);

server.on('connection', (socket)=> {
    sockets.push(socket);
    socket.on('close', ()=> {
        sockets.splice(sockets.indexOf(socket), 1);
    });
});
server.stop = (done) => {
    sockets.forEach(socket=> socket.destroy());
    server.close(done);
};
server.start = (done) => {
    server.listen(5001, done);
};

module.exports = { server };