const { expect } = require('chai');
const { server } = require('./support/serving-assets');
const { page } = require('./support/page');

describe('live update', () => {

    beforeEach((done) => {
        server.start(() => { page.open(done); });
    });
    afterEach((done) => {
        page.close(() => { server.stop(done); });
    });

    it('is triggered via start', (done) => {
        page.window.delay = 10;
        page.document.getElementById('start').click();
        setTimeout(() => {
            expect(page.window.times).to.deep.equal({
                test: 2, code: 0, refactor: 0, step:2
            });
            done();
        }, 30);
    });

    it('will stop after delay when interupted', (done) => {
        page.window.delay = 10;
        page.document.getElementById('start').click();
        setTimeout(() => {
            page.document.getElementById('stop').click();
            setTimeout(() => {
                expect(page.window.times).to.deep.equal({
                    test: 3, code: 0, refactor: 0, step: 3
                });
                done();
            }, 30);
        }, 30);
    });
});