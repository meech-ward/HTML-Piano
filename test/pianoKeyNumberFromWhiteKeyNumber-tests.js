const chai = require('chai');
const expect = chai.expect;

const piano = require('../piano/piano');

describe("piano", function() {
  describe('#pianoKeyNumberFromWhiteKeyNumber', () => {
    context("given undefined", () => {
      it("should return 0", () => {
        expect(piano.pianoKeyNumberFromWhiteKeyNumber()).to.equal(0);
      })
    });
    context("given a number of white keys", () => {
      context("given no black keys", () => {
        it("should return that number of white keys", () => {
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(0)).to.equal(0);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(1)).to.equal(1);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(123)).to.equal(123);
        });
      });
    });
    context("given an array of size n of black keys", () => {
      context("given n white keys", () => {
        it("should return the number of 1s in the black keys array plus the number of white keys", () => {
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(0, [])).to.equal(0);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(1, [0])).to.equal(1);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(2, [0, 0])).to.equal(2);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(3, [0, 0, 0])).to.equal(3);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(1, [1])).to.equal(2);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(2, [1, 1])).to.equal(4);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(3, [1, 1, 1])).to.equal(6);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(1, [1])).to.equal(2);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(2, [1, 0])).to.equal(3);
          expect(piano.pianoKeyNumberFromWhiteKeyNumber(3, [0, 1, 0])).to.equal(4);
        });
      });
    });
  });
});