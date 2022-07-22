const { readFile } = require('./support/files');
const readAsset = (file) => {
    return readFile(`./instrumented/${file}`);
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
    '/event-bus.js': { 
        contentType: 'application/javascript', 
        content: readAsset('event-bus.js')
    },
    '/hints.js': { 
        contentType: 'application/javascript', 
        content: readAsset('hints.js')
    },
    '/main.js': { 
        contentType: 'application/javascript', 
        content: readAsset('main.js')
    },
};
module.exports = { assets };