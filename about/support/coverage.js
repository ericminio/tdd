const { readFile, writeFile } = require('./files');

const extractInstrumentor = (code) => code.substring(code.indexOf('cov_'), code.indexOf('(')).trim();

const instrumented = (options) => {
    let code = readFile(options.file);
    let instrumentor = extractInstrumentor(code);
    return (new Function(`${code} \n return {coverage:${instrumentor}, ${options.sut}};`))();
};

const save = (coverage) => {
    let actualCoverage = coverage();
    let data = {};
    data[actualCoverage.path] = actualCoverage;
    
    writeFile(outputFileName(actualCoverage.path), data);
}

const outputFileName = (file) => {
    let name = file.substring(1+file.lastIndexOf('/'));
    name = name.substring(0, name.indexOf('.'));
    
    return `.nyc_output/${name}-${Date.now()}.json`;
}

module.exports = { instrumented, save };