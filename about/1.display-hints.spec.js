const { expect } = require('chai');
const { server } = require('./serving-assets');
const { page } = require('./page');

describe('display hints when choosing a step', () => {

    let hints;
    beforeEach((done) => {
        server.start(() => { page.open(() => {
            hints = page.find('#hints');
            done();
        }); });
    });
    afterEach((done) => {
        page.close(() => { server.stop(done); });
    });

    it('works with step code', () => {
        page.click('#code');

        expect(hints.innerHTML).to.contain('go to green');
    });

    it('works with step refactor', () => {
        page.click('#refactor');

        expect(hints.innerHTML).to.contain('duplication?');
    });

    it('works with step test', () => {
        page.click('#test');

        expect(hints.innerHTML).to.contain('go to red');
    });

    it('defaults to step test', () => {
        expect(hints.innerHTML).to.contain('go to red');
    });
});