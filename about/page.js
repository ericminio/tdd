const { JSDOM } = require('jsdom');

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
    let coverage = page.window.__coverage__;
    require('fs').writeFileSync('.nyc_output/coverage.json', JSON.stringify(coverage));
    done();
};

const page = { open, close };

module.exports = { page };