const fs = require('fs');

const readFile = (file) => {
    return fs.readFileSync(file).toString();
};

module.exports = { readFile }