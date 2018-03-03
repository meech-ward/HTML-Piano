const chai = require('chai');
const expect = chai.expect;

let document = {};

const pianoBuilder = require('../../piano/src/piano-builder')(document);
const PianoBuildError = require('../../piano/src/piano-build-error');


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

    context("in a single octave", () => {
      context("given two identical white keys", () => {
        const note = noteData("c", 1);
        let output = null;
        beforeEach(() => {
          output = pianoBuilder.keysFromNotes(note, note);
        })
        it("should return 1 white keys amount", () => {
          expect(output.whiteKeysAmount).to.equal(1);
        });
        it("should return empty black keys layout", () => {
          expect(output.blackKeyLayout).to.deep.equal([]);
        });
      });

      context("given two neighboring white keys", () => {
        context("with no sharp note in the middle", () => {
          const note1 = noteData("e", 1);
          const note2 = noteData("f", 1);
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
        context("with a sharp note in the middle", () => {
          const note1 = noteData("c", 1);
          const note2 = noteData("d", 1);
          let output = null;
          beforeEach(() => {
            output = pianoBuilder.keysFromNotes(note1, note2);
          })
          it("should return 2 white keys amount", () => {
            expect(output.whiteKeysAmount).to.equal(2);
          });
          it("should return 0, 1 black keys layout", () => {
            const blackExpected = [{visible: false, amount: 1}, 
            {visible: true, amount: 1}];
            expect(output.blackKeyLayout).to.deep.equal(blackExpected);
          });
        });
      });

      context("given three neighboring white keys", () => {
        context("with one sharp note in the first middle", () => {
          const note1 = noteData("d", 1);
          const note2 = noteData("f", 1);
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
          const note1 = noteData("e", 1);
          const note2 = noteData("g", 1);
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

        context("with two sharp notes in the middle", () => {
          const note1 = noteData("c", 1);
          const note2 = noteData("e", 1);
          let output = null;
          beforeEach(() => {
            output = pianoBuilder.keysFromNotes(note1, note2);
          })
          it("should return 3 white keys amount", () => {
            expect(output.whiteKeysAmount).to.equal(3);
          });
          it("should return 1 invisible, 2 visible black keys layout", () => {
            const blackExpected = [{visible: false, amount: 1}, 
            {visible: true, amount: 2}];
            expect(output.blackKeyLayout).to.deep.equal(blackExpected);
          });
        });
      });
      context("given a single octave", () => {
        const note1 = noteData("c", 1);
        const note2 = noteData("b", 1);
        let output = null;
        beforeEach(() => {
          output = pianoBuilder.keysFromNotes(note1, note2);
        })
        it("should return 7 white keys amount", () => {
          expect(output.whiteKeysAmount).to.equal(7);
        });
        it("should return standard black keys layout", () => {
          const blackExpected = [
            {visible: false, amount: 1}, 
            {visible: true, amount: 2},
            {visible: false, amount: 1},
            {visible: true, amount: 3}];
          expect(output.blackKeyLayout).to.deep.equal(blackExpected);
        });
      });
    });
  });
});