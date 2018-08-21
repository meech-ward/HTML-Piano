const chai = require('chai');
const expect = chai.expect;

const piano = require('../piano/src/keyData');

describe("piano", function() {
  describe('#keyNumber', () => {
    context("given undefined", () => {
      it("should return null", () => {
        expect(piano.keyNumber()).to.equal(null);
      });
    });
    context("given an empty object", () => {
      it("should return null", () => {
        expect(piano.keyNumber({})).to.equal(null);
      });
    });
    context("given an object with an empty class list", () => {
      it("should return null", () => {
        expect(piano.keyNumber({classList: []})).to.equal(null);
      });
    });
    context("given an object with a random class", () => {
      it("should return null", () => {
        expect(piano.keyNumber({classList: ["random"]})).to.equal(null);
      });
    });
    context("given an object with a class 'piano-key-n'", () => {
      it("should return the value of n as a number", () => {
        expect(piano.keyNumber({classList: ["piano-key-0"]})).to.equal(0);
        expect(piano.keyNumber({classList: ["piano-key-1"]})).to.equal(1);
        expect(piano.keyNumber({classList: ["piano-key-123"]})).to.equal(123);
      });
    });
  });
});