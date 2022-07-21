const { expect } = require('chai');
const { readFile } = require('./support/files');
const code = readFile('./instrumented/format-time.js');
const instrumentorName = code.substring(code.indexOf('cov_'), code.indexOf('(')).trim();
const {instrumentor, formatTime} = (new Function(`${code} \n return {instrumentor:${instrumentorName}, formatTime};`))();

describe('format time', () => {

    after(() => {
        let coverage = instrumentor();
        let data = {};
        data[coverage.path] = coverage;
        let fileName = `.nyc_output/${instrumentorName}-${Date.now()}.json`;
        require('fs').writeFileSync(fileName, JSON.stringify(data));
    });

    it('keeps seconds as is', () => {
        expect(formatTime(45)).to.equal('45s');
    });
    it('eventually displays minutes', () => {
        expect(formatTime(65)).to.equal('1mn 5s');
    });
    it('resists time', () => {
        expect(formatTime(100)).to.equal('1mn 40s');
    });
});