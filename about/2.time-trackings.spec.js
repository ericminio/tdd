const { expect } = require('chai');
const { page } = require('./page');

describe('time tracking', () => {

    beforeEach((done) => {
        page.open(done)
    });
    afterEach(() => {
        page.close();
    })

    it('keeps track of time distribution', () => {
        work();
        expect(page.window.times).to.deep.equal({
            test: 2, code: 3, refactor: 3,
            ptest: 0.25, pcode: 0.375, prefactor: 0.375
        });
    });

    const work = () => {
        choose('test');
        page.window.tick();
        page.window.tick();
        choose('code');
        page.window.tick();
        page.window.tick();
        page.window.tick();
        choose('refactor');
        page.window.tick();
        page.window.tick();
        page.window.tick();
    }
    const choose = (step) => {
        page.document.getElementById(step).click();
    }

    it('discloses percentages', () => {
        work();
        expect(page.document.getElementById('percentage-test').innerHTML).to.equal('25');
        expect(page.document.getElementById('percentage-code').innerHTML).to.equal('38');
        expect(page.document.getElementById('percentage-refactor').innerHTML).to.equal('38');
    });
});