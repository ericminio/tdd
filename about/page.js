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
    response.setHeader('Content-Length', assets[request.url].content.length);
    response.setHeader('Content-Type', assets[request.url].contentType);
    response.write(assets[request.url].content);
    response.end();
});

const open = (done) => {
    server.listen(port, () => {
        JSDOM.fromURL(`http://localhost:${port}`, { 
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
    server.close(done);
}

const page = { open, close };

module.exports = { page };