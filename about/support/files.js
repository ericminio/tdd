const fs = require('fs');

const readFile = (file) => {
    return fs.readFileSync(file).toString();
};

const writeFile = (file, content) => {
    fs.writeFileSync(file, JSON.stringify(content));
};

module.exports = { readFile, writeFile }