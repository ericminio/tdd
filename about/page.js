const { JSDOM } = require('jsdom');
const { servingAssets } = require('./serving-assets');
const http = require('http');
const port = 5001;
const sockets = [];

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
    server.listen(port, done);
};

const open = (done, query) => {
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
};

const close = (done) => {
    let coverage = page.window.__coverage__;
    require('fs').writeFileSync('.nyc_output/coverage.json', JSON.stringify(coverage));
    done();
};

const page = { open, close };

module.exports = { server, page };