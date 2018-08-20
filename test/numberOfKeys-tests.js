const chai = require('chai');
const expect = chai.expect;

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const window = MockBrowser.createWindow();

const { newPiano } = require('../piano/src/piano')(window);

// this.numberOfWhiteKeys
// this.numberOfBlackKeys

describe("piano", function() {
  describe('#newPiano', () => {

    context("given no white key and 0 numberOfBlackKeys", () => {
      it("should return 0 numberOfWhiteKeys & 0 numberOfBlackKeys & 0 totalKeys", () => {
        const piano = newPiano(0, []);
        expect(piano.numberOfWhiteKeys).to.equal(0);
        expect(piano.numberOfBlackKeys).to.equal(0);
        expect(piano.totalKeys).to.equal(0);
      });
    });

    context("given 1 white key and no black keys", () => {
      it("should return 1 numberOfWhiteKeys & 0 numberOfBlackKeys & 1 totalKeys", () => {
        const piano = newPiano(1, []);
        expect(piano.numberOfWhiteKeys).to.equal(1);
        expect(piano.numberOfBlackKeys).to.equal(0);
        expect(piano.totalKeys).to.equal(1);
      });
    });

    context("given 0 white key and 1 black keys", () => {
      it("should return 0 numberOfWhiteKeys & 1 numberOfBlackKeys & 1 totalKeys", () => {
        const piano = newPiano(0, [{visible: true, amount: 1}]);
        expect(piano.numberOfWhiteKeys).to.equal(0);
        expect(piano.numberOfBlackKeys).to.equal(1);
        expect(piano.totalKeys).to.equal(1);
      });
    });

    context("given 0 white key and 1 invisible black keys", () => {
      it("should return 0 numberOfWhiteKeys & 0 numberOfBlackKeys & 0 totalKeys", () => {
        const piano = newPiano(0, [{visible: false, amount: 1}]);
        expect(piano.numberOfWhiteKeys).to.equal(0);
        expect(piano.numberOfBlackKeys).to.equal(0);
        expect(piano.totalKeys).to.equal(0);
      });
    });

    context("given 5 white key and 6 black keys", () => {
      it("should return 5 numberOfWhiteKeys & 6 numberOfBlackKeys & 11 totalKeys", () => {
        const piano = newPiano(5, [{visible: false, amount: 1}, {visible: true, amount: 4}, {visible: false, amount: 1}, {visible: true, amount: 2}]);
        expect(piano.numberOfWhiteKeys).to.equal(5);
        expect(piano.numberOfBlackKeys).to.equal(6);
        expect(piano.totalKeys).to.equal(11);
      });
    });
  });
});