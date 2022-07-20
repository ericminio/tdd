const { expect } = require('chai');
const { server } = require('./server');
const { page } = require('./page');

describe('time tracking', () => {

    beforeEach((done) => {
        server.start(() => { page.open(done); });
    });
    afterEach((done) => {
        page.close(() => { server.stop(done); });
    });

    it('keeps track of time distribution', () => {
        work();
        expect(page.window.times).to.deep.equal({
            test: 2, code: 3, refactor: 3, step:3
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

    it('assumes one tick is one second', () => {
        work();
        expect(page.document.getElementById('total-time').innerHTML).to.equal('8s');
    });

    it('keep track of the time spent in current step', () => {
        work();
        expect(page.document.getElementById('step-time').innerHTML).to.equal('3s');
    });

    describe('updates of arc sizes used by the pie chart', () => {

        let root;
        beforeEach(() => {
            work();
            root = page.document.querySelector(':root');
        });

        it('updates the deg value for test', () => {
            expect(root.style.getPropertyValue('--val-test')).to.equal('90');
        });

        it('updates the deg value for code', () => {
            expect(root.style.getPropertyValue('--val-code')).to.equal('135');
        });
    });
});