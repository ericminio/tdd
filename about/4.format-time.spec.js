const { expect } = require('chai');
const { saveCoverage } = require('./support/coverage');
const { expose } = require('./support/source');
const { assets: { '/format-time.js': { content: code }} } = require('./assets');
const { formatTime } = expose({ sut: 'formatTime', code });

describe('format time', () => {

    after(() => {
        saveCoverage(global.__coverage__);
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