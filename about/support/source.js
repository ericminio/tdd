const { readFile } = require('./files');

const expose = (options) => {
    let code = readFile(options.file);
    return (new Function(`${code} \n return { ${options.sut} };`))();
};

module.exports = { expose };