const chai = require('chai');
const expect = chai.expect;

const piano = require('../piano/src/piano-utilities');

describe("piano", function() {
  describe('#arrayFromBlackKeys', () => {
    context("given undefined", () => {
      it("should return an empty array", () => {
        const result = piano.arrayFromBlackKeys();
        expect(result).to.be.empty;
      });
    });
    context("given an empty array", () => {
      it("should return an empty array", () => {
        const result = piano.arrayFromBlackKeys([]);
        expect(result).to.be.empty;
      });
    });
    context("given an array with an empty object", () => {
      it("should return an empty array", () => {
        const result = piano.arrayFromBlackKeys([{}]);
        expect(result).to.be.empty;
      });
    });
    context("given an object with {visible: true} and an empty amount", () => {
      it("should return an empty array", () => {
        expect(piano.arrayFromBlackKeys([{visible: true, amount: 0}])).to.be.empty;
      });
    });
    context("given an object with {visible: false} and any amount", () => {
      it("should return an array with that many zeros", () => {
        expect(piano.arrayFromBlackKeys([{visible: false, amount: 0}])).to.be.empty;
        expect(piano.arrayFromBlackKeys([{visible: false, amount: 1}])).to.deep.equal([0]);
        expect(piano.arrayFromBlackKeys([{visible: false, amount: 2}])).to.deep.equal([0, 0]);
      });
    });
    context("given an object with {visible: true} and any amount", () => {
      it("should return an array with that many ones", () => {
        expect(piano.arrayFromBlackKeys([{visible: true, amount: 0}])).to.be.empty;
        expect(piano.arrayFromBlackKeys([{visible: true, amount: 1}])).to.deep.equal([1]);
        expect(piano.arrayFromBlackKeys([{visible: true, amount: 2}])).to.deep.equal([1, 1]);
      });
    });
    context("given objects with mixed visibilities and amounts", () => {
      it("should return an array with zeros for no visibility and ones for visibility", () => {
        expect(piano.arrayFromBlackKeys([{visible: true, amount: 0}, {visible: false, amount: 0}])).to.be.empty;
        expect(piano.arrayFromBlackKeys([{visible: true, amount: 1}, {visible: false, amount: 1}])).to.deep.equal([1, 0]);
        expect(piano.arrayFromBlackKeys([{visible: false, amount: 1}, {visible: true, amount: 2}, {visible: false, amount: 2}])).to.deep.equal([0, 1, 1, 0, 0]);
        expect(piano.arrayFromBlackKeys([{visible: true, amount: 1}, {visible: true, amount: 0}, {visible: false, amount: 2}])).to.deep.equal([1, 0, 0]);
      });
    });
  });
});