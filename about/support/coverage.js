const { readFile, writeFile } = require('./files');

const instrumented = (options) => {
    let code = readFile(options.file);
    return (new Function(`${code} \n return { ${options.sut} };`))();
};

const saveCoverage = (coverage) => {
    writeFile(`.nyc_output/coverage-${Date.now()}.json`, coverage);
};

module.exports = { instrumented, saveCoverage };