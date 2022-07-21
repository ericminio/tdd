const { readFile, writeFile } = require('./files');

const extractInstrumentor = (code) => code.substring(code.indexOf('cov_'), code.indexOf('(')).trim();

const instrumented = (options) => {
    let code = readFile(options.file);
    let instrumentor = extractInstrumentor(code);
    return (new Function(`${code} \n return {coverage:${instrumentor}, ${options.sut}};`))();
};

const save = (coverage, file) => {
    let actualCoverage = coverage();
    let data = {};
    data[actualCoverage.path] = actualCoverage;
    writeFile(file, data);
}

module.exports = { instrumented, save };