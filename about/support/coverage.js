const { readFile, writeFile } = require('./files');

const extractInstrumentor = (code) => code.substring(code.indexOf('cov_'), code.indexOf('(')).trim();

const instrumented = (options) => {
    let code = readFile(options.file);
    let instrumentor = extractInstrumentor(code);
    return (new Function(`${code} \n return {coverage:${instrumentor}, ${options.sut}};`))();
};

const savePartialCoverage = (coverage) => {
    let data = {};
    data[coverage.path] = coverage;
    saveCoverage(data);
};

const saveCoverage = (coverage) => {
    writeFile(`.nyc_output/coverage-${Date.now()}.json`, coverage);
};

module.exports = { instrumented, saveCoverage, savePartialCoverage };