const fs = require('fs');
const readAsset = (file) => {
    return fs.readFileSync(`./instrumented/${file}`).toString() 
}
const assets = {
    '/': { 
        contentType: 'text/html', 
        content: readAsset('index.html')
    },
    '/app.css': { 
        contentType: 'text/css', 
        content: readAsset('app.css')
    },
    '/poh.js': { 
        contentType: 'application/javascript', 
        content: readAsset('poh.js')
    },
    '/format-time.js': { 
        contentType: 'application/javascript', 
        content: readAsset('format-time.js')
    },
    '/render-times.js': { 
        contentType: 'application/javascript', 
        content: readAsset('render-times.js')
    },
    '/render-hints.js': { 
        contentType: 'application/javascript', 
        content: readAsset('render-hints.js')
    },
    '/model.js': { 
        contentType: 'application/javascript', 
        content: readAsset('model.js')
    }
};
module.exports = { assets };