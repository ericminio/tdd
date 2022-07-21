const { JSDOM } = require('jsdom');
const { saveGlobalCoverage } = require('./coverage');

const open = (done, query) => {
    let url = `http://localhost:5001`;
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
    saveGlobalCoverage(page.window.__coverage__);    
    done();
};

const page = { open, close };

module.exports = { page };