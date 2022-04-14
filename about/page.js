const { JSDOM } = require('jsdom');
const http = require('http');
const port = 5001;
const fs = require('fs');
const assets = {
    '/': { 
        contentType: 'text/html', 
        content:fs.readFileSync('../app/index.html').toString() 
    },
    '/app.css': { 
        contentType: 'text/css', 
        content:fs.readFileSync('../app/app.css').toString() 
    },
    '/poh.js': { 
        contentType: 'application/javascript', 
        content:fs.readFileSync('../app/poh.js').toString() 
    },
    '/format-time.js': { 
        contentType: 'application/javascript', 
        content:fs.readFileSync('../app/format-time.js').toString() 
    },
    '/render-times.js': { 
        contentType: 'application/javascript', 
        content:fs.readFileSync('../app/render-times.js').toString() 
    },
    '/render-hints.js': { 
        contentType: 'application/javascript', 
        content:fs.readFileSync('../app/render-hints.js').toString() 
    },
    '/model.js': { 
        contentType: 'application/javascript', 
        content:fs.readFileSync('../app/model.js').toString() 
    }
};
const server = http.createServer((request, response) => {
    if (request.url.startsWith('/index.html?')) {
        request.url = '/';
    }
    response.setHeader('Content-Length', assets[request.url].content.length);
    response.setHeader('Content-Type', assets[request.url].contentType);
    response.write(assets[request.url].content);
    response.end();
});
const sockets = [];
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
    sockets.forEach(socket=> socket.destroy());
    server.close(done);
}

const page = { open, close };

module.exports = { page };