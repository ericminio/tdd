const { writeFile } = require('./files');

const saveCoverage = (coverage) => {
    writeFile(`.nyc_output/coverage-${Date.now()}.json`, coverage);
};

module.exports = { saveCoverage };