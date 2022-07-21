const { assets } = require('./assets');
const { Server } = require('./support/server');

const servingAssets = (request, response) => {
    if (request.url.startsWith('/index.html?')) {
        request.url = '/';
    }
    response.setHeader('Content-Length', assets[request.url].content.length);
    response.setHeader('Content-Type', assets[request.url].contentType);
    response.end(assets[request.url].content);
};

module.exports = { server: new Server(5001, servingAssets) } ;