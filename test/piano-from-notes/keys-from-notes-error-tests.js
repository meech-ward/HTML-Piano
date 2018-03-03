const chai = require('chai');
const expect = chai.expect;

let document = {};

const pianoBuilder = require('../../piano/src/piano-builder')(document);
const PianoBuildError = require('../../piano/src/piano-build-error');

function throwableFunction() {
  const functionThatThrows = arguments[0].bind(this);
  const otherArguments = Array.from(arguments).slice(1);
  return (() => {
    return functionThatThrows.apply(this, otherArguments);
  }).bind(this);
}

function buildPianoWithNotes() {
  return throwableFunction.bind(this).apply(this, [pianoBuilder.keysFromNotes].concat(Array.from(arguments)));
}

describe("piano", function() {
  describe('#keysFromNotes', () => {
    context("given undefined", () => {
      it("should throw an error", () => {
        expect(buildPianoWithNotes()).to.throw(PianoBuildError);
      });
    });
    context("given one parameter", () => {
      it("should throw an error", () => {
        expect(buildPianoWithNotes("")).to.throw(PianoBuildError);
      });
    });
    context("given null", () => {
      it("should throw an error", () => {
        expect(buildPianoWithNotes(null)).to.throw(PianoBuildError);
      });
    });
    context("given two not objects", () => {
      it("should throw an error", () => {
        expect(buildPianoWithNotes(0, 0)).to.throw(PianoBuildError);
        expect(buildPianoWithNotes(1, "")).to.throw(PianoBuildError);
      });
    });
    context("given two empty objects", () => {
      it("should throw an error", () => {
        expect(buildPianoWithNotes({}, {})).to.throw(PianoBuildError);
      });
    });
    context("given two valid note data objects", () => {
      it("should throw an error", () => {
        expect(buildPianoWithNotes({param: 1}, {something: 0})).to.throw(PianoBuildError);
      });
    });
    context("given two valid note data objects", () => {
      context("given invalid keyboard notes", () => {
        it("should throw an error", () => {
          const noteData = {
            note: "z",
            section: 1
          };
          expect(buildPianoWithNotes(noteData, noteData)).to.throw(PianoBuildError);
        });
      });
      context("given invalid keyboard octave", () => {
        it("should throw an error", () => {
          const noteData1 = {
            note: "c",
            octave: -1
          };
          expect(buildPianoWithNotes(noteData1, noteData1)).to.throw(PianoBuildError);
          const noteData2 = {
            note: "c",
            octave: 9
          };
          expect(buildPianoWithNotes(noteData2, noteData2)).to.throw(PianoBuildError);
        });
      });
      context("given second octave greater than first octave", () => {
        it("should throw an error", () => {
          const noteData1 = {
            note: "c",
            octave: 2
          };
          const noteData2 = {
            note: "c",
            octave: 1
          };
          expect(buildPianoWithNotes(noteData1, noteData2)).to.throw(PianoBuildError);
        });
      });
      context("given same octave but second note greater than first note", () => {
        it("should throw an error", () => {
          const noteData1 = {
            note: "d",
            octave: 1
          };
          const noteData2 = {
            note: "c",
            octave: 1
          };
          expect(buildPianoWithNotes(noteData1, noteData2)).to.throw(PianoBuildError);
        });
      });
      context("given start note is sharp", () => {
        it("should throw an error", () => {
          const noteData1 = {
            note: "c#",
            octave: 1
          };
          const noteData2 = {
            note: "d",
            octave: 1
          };
          expect(buildPianoWithNotes(noteData1, noteData2)).to.throw(PianoBuildError);
        });
      });
      context("given end note is sharp", () => {
        it("should throw an error", () => {
          const noteData1 = {
            note: "c",
            octave: 1
          };
          const noteData2 = {
            note: "c#",
            octave: 1
          };
          expect(buildPianoWithNotes(noteData1, noteData2)).to.throw(PianoBuildError);
        });
      });
      context("given one valid, one invalid keyboard note", () => {
        it("should throw an error", () => {
          const noteData1 = {
            note: "c",
            octave: 0
          };
          const noteData2 = {
            note: "z",
            octave: 9
          };
          expect(buildPianoWithNotes(noteData1, noteData2)).to.throw(PianoBuildError);
          expect(buildPianoWithNotes(noteData2, noteData1)).to.throw(PianoBuildError);
        });
      });
    });
  });
});