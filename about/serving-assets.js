const { assets } = require('./assets');

const servingAssets = (request, response) => {
    if (request.url.startsWith('/index.html?')) {
        request.url = '/';
    }
    response.setHeader('Content-Length', assets[request.url].content.length);
    response.setHeader('Content-Type', assets[request.url].contentType);
    response.write(assets[request.url].content);
    response.end();
};

module.exports = { servingAssets } ;