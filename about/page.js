const { JSDOM } = require('jsdom');
const { saveCoverage } = require('./support/coverage');

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
    saveCoverage(page.window.__coverage__);    
    done();
};

const page = { open, close };

page.find = (selector) => {
    return page.document.querySelector(selector);
};
page.click = (selector) => {
    let element = page.find(selector);
    element.click();
};

module.exports = { page };