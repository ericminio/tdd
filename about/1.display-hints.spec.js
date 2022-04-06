const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const http = require('http');
const port = 5001;
const fs = require('fs');
const assets = {
    '/': { 
        contentType: 'text/html', 
        content:fs.readFileSync('../app/index.html').toString() 
    },
    '/poh.js': { 
        contentType: 'application/javascript', 
        content:fs.readFileSync('../app/poh.js').toString() 
    },
    '/format-time.js': { 
        contentType: 'application/javascript', 
        content:fs.readFileSync('../app/format-time.js').toString() 
    }
};

describe('display hints when choosing a step', () => {

    let server;
    let document;
    let hints;
    beforeEach((done) => {
        server = http.createServer((request, response) => {
            response.setHeader('Content-Length', assets[request.url].content.length);
            response.setHeader('Content-Type', assets[request.url].contentType);
            response.write(assets[request.url].content);
            response.end();
        });
        server.listen(port, () => {
            JSDOM.fromURL(`http://localhost:${port}`, { 
                runScripts: "dangerously", 
                resources: "usable" 
            }).then(dom => {                
                document = dom.window.document;
                hints = document.getElementById('hints');
                document.addEventListener('DOMContentLoaded', () => {                    
                    done();
                });                
            }).catch(error => {
                done(error);
            });
        })
    });
    afterEach(() => {
        server.close();
    })

    it('works with step test', () => {        
        let step = document.getElementById('test');
        step.click();

        expect(hints.innerHTML).to.contain('go to red');
    });
    it('works with step code', () => {
        let step = document.getElementById('code');
        step.click();

        expect(hints.innerHTML).to.contain('go to green');
    });
    it('works with step refactor', () => {
        let step = document.getElementById('refactor');
        step.click();

        expect(hints.innerHTML).to.contain('duplication?');
    });
});