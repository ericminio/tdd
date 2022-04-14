const { expect } = require('chai');
const { page } = require('./page');

describe('display hints when choosing a step', () => {

    let hints;
    beforeEach((done) => {
        page.open(() => {
            hints = page.document.getElementById('hints');
            done();
        })
    });
    afterEach((done) => {
        page.close(done);
    })

    it('works with step test', () => {
        let step = page.document.getElementById('test');
        step.click();

        expect(hints.innerHTML).to.contain('go to red');
    });
    it('works with step code', () => {
        let step = page.document.getElementById('code');
        step.click();

        expect(hints.innerHTML).to.contain('go to green');
    });
    it('works with step refactor', () => {
        let step = page.document.getElementById('refactor');
        step.click();

        expect(hints.innerHTML).to.contain('duplication?');
    });

    it('defaults to test', () => {
        expect(hints.textContent).to.contain('go to red');
    });
});