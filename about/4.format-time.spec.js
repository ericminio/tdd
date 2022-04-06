const { expect } = require('chai');
const code = require('fs').readFileSync('../app/format-time.js').toString();
const formatTime = (new Function(`${code} return formatTime;`))();

describe('format time', () => {

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