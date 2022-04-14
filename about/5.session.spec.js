const { expect } = require('chai');
const { page } = require('./page');

describe('session', () => {

    describe('start', () => {

        beforeEach((done) => {
            page.open(done)
        });
        afterEach((done) => {
            page.close(done);
        });

        it('zeroes all times', () => {
            expect(page.window.times).to.deep.equal({
                test: 0, code: 0, refactor: 0, step:0
            });
        });

        it('zeroes test percentage', () => {
            expect(page.document.getElementById('percentage-test').innerHTML).to.equal('0');
        });
        it('zeroes code percentage', () => {
            expect(page.document.getElementById('percentage-code').innerHTML).to.equal('0');
        });
        it('zeroes refactor percentage', () => {
            expect(page.document.getElementById('percentage-refactor').innerHTML).to.equal('0');
        });

        it('zeroes total time', () => {
            expect(page.document.getElementById('total-time').innerHTML).to.equal('0s');
        });
        it('zeroes step time', () => {
            expect(page.document.getElementById('step-time').innerHTML).to.equal('0s');
        });
    });

    describe('initialization to non-zero start', () => {

        beforeEach((done) => {
            page.open(done, '/index.html?test=1&code=2&refactor=3')
        });
        afterEach((done) => {
            page.close(done);
        });

        it('is possible via query string', () => {
            expect(page.window.times).to.deep.equal({
                test: 1, code: 2, refactor: 3, step:0
            });
        });
    });
});