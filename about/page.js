const { JSDOM } = require('jsdom');
const { assets } = require('./assets');
const http = require('http');
const port = 5001;
const sockets = [];

const server = http.createServer((request, response) => {
    if (request.url.startsWith('/index.html?')) {
        request.url = '/';
    }
    response.setHeader('Content-Length', assets[request.url].content.length);
    response.setHeader('Content-Type', assets[request.url].contentType);
    response.write(assets[request.url].content);
    response.end();
});
server.on('connection', (socket)=> {
    sockets.push(socket);
    socket.on('close', ()=> {
        sockets.splice(sockets.indexOf(socket), 1);
    });
});

const open = (done, query) => {
    server.listen(port, () => {
        let url = `http://localhost:${port}`;
        if (query !== undefined) {
            url += query;
        }
        JSDOM.fromURL(url, { 
            runScripts: "dangerously", 
            resources: "usable" 
        }).then(dom => {   
            page.window = dom.window;             
            page.document = dom.window.document;
            page.document.addEventListener('DOMContentLoaded', () => {                    
                done();
            });                
        }).catch(error => {
            done(error);
        });
    });    
}

const close = (done) => {
    let coverage = page.window.__coverage__;
    require('fs').writeFileSync('.nyc_output/coverage.json', JSON.stringify(coverage));

    sockets.forEach(socket=> socket.destroy());
    server.close(done);
}

const page = { open, close };

module.exports = { page };