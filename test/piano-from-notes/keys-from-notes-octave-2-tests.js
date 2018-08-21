const chai = require('chai');
const expect = chai.expect;

let document = {};

const pianoDOM = require('../../piano/src/HTML/piano-DOM')(document || window.document);
const pianoBuilder = require('../../piano/src/build/piano-builder')(pianoDOM);
const PianoBuildError = require('../../piano/src/build/piano-build-error');


function blankKeys() {
  let whiteKeysAmount = 0;
  let blackKeyLayout = [];

  return {whiteKeysAmount, blackKeyLayout};
}

function noteData(note, octave) {
  return {note, octave};
}

describe("piano", function() {
  describe('#keysFromNotes', () => {

    context("in multiple octaves", () => {

      context("given two neighboring white keys", () => {
        context("with no sharp note in the middle", () => {
          const note1 = noteData("b", 1);
          const note2 = noteData("c", 2);
          let output = null;
          beforeEach(() => {
            output = pianoBuilder.keysFromNotes(note1, note2);
          })
          it("should return 2 white keys amount", () => {
            expect(output.whiteKeysAmount).to.equal(2);
          });
          it("should return empty black keys layout", () => {
            expect(output.blackKeyLayout).to.deep.equal([]);
          });
        });
      });

      context("given three neighboring white keys", () => {
        context("with one sharp note in the first middle", () => {
          const note1 = noteData("a", 1);
          const note2 = noteData("c", 2);
          let output = null;
          beforeEach(() => {
            output = pianoBuilder.keysFromNotes(note1, note2);
          })
          it("should return 3 white keys amount", () => {
            expect(output.whiteKeysAmount).to.equal(3);
          });
          it("should return 0, 1 black keys layout", () => {
            const blackExpected = [{visible: false, amount: 1}, 
            {visible: true, amount: 1}];
            expect(output.blackKeyLayout).to.deep.equal(blackExpected);
          });
        });
        context("with one sharp note in the second middle", () => {
          const note1 = noteData("b", 1);
          const note2 = noteData("d", 2);
          let output = null;
          beforeEach(() => {
            output = pianoBuilder.keysFromNotes(note1, note2);
          })
          it("should return 3 white keys amount", () => {
            expect(output.whiteKeysAmount).to.equal(3);
          });
          it("should return 2 false, 1 true black keys layout", () => {
            const blackExpected = [{visible: false, amount: 2}, 
            {visible: true, amount: 1}];
            expect(output.blackKeyLayout).to.deep.equal(blackExpected);
          });
        });

        context("given two whole octaves", () => {
          const note1 = noteData("c", 1);
          const note2 = noteData("b", 2);
          let output = null;
          beforeEach(() => {
            output = pianoBuilder.keysFromNotes(note1, note2);
          })
          it("should return 14 white keys amount", () => {
            expect(output.whiteKeysAmount).to.equal(14);
          });
          it("should return standard black keys layout", () => {
            const blackExpected = [
              {visible: false, amount: 1}, 
              {visible: true, amount: 2},
              {visible: false, amount: 1},
              {visible: true, amount: 3},
              {visible: false, amount: 1}, 
              {visible: true, amount: 2},
              {visible: false, amount: 1},
              {visible: true, amount: 3}];
            expect(output.blackKeyLayout).to.deep.equal(blackExpected);
          });
        });

        context("given two whole octaves from half way", () => {
          const note1 = noteData("f", 1);
          const note2 = noteData("e", 3);
          let output = null;
          beforeEach(() => {
            output = pianoBuilder.keysFromNotes(note1, note2);
          })
          it("should return 14 white keys amount", () => {
            expect(output.whiteKeysAmount).to.equal(14);
          });
          it("should return standard black keys layout", () => {
            const blackExpected = [
              {visible: false, amount: 1}, 
              {visible: true, amount: 3},
              {visible: false, amount: 1},
              {visible: true, amount: 2},
              {visible: false, amount: 1}, 
              {visible: true, amount: 3},
              {visible: false, amount: 1},
              {visible: true, amount: 2}];
            expect(output.blackKeyLayout).to.deep.equal(blackExpected);
          });
        });
      });
    });
  });
});