const { expect } = require('chai');
const code = require('fs').readFileSync('./instrumented/format-time.js').toString();
const {cov_1kkeo2hz14, formatTime} = (new Function(`${code} \n return {cov_1kkeo2hz14, formatTime};`))();

describe('format time', () => {

    after(() => {
        let coverage = cov_1kkeo2hz14();
        let data = {};
        data[coverage.path] = coverage;
        require('fs').writeFileSync('.nyc_output/cov_1kkeo2hz14.json', JSON.stringify(data));
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