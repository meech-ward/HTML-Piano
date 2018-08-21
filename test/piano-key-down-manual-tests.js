const chai = require('chai');
const expect = chai.expect;

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const window = MockBrowser.createWindow();
const document = MockBrowser.createDocument();
const pianoDOM = require('../piano/src/HTML/piano-DOM')(document || window.document);

const newPiano = require('../piano/src/piano')(pianoDOM).newPiano;

function newPianoKey() {
  let thing = {};
  let pianoElem = pianoDOM.pianoElementMake.call(thing);
  return pianoDOM.whiteKeyMake.call(thing, 1, 1, 1, 1);
}

function forceKeyDown(piano, key) {
  let data = null;
  piano._keyDown = (param) => {
    data = param;
  }
  piano.forceKeyDown(key);
  return data;
}

function forceKeyUp(piano, key) {
  let data = null;
  piano._keyUp = (param) => {
    data = param;
  }
  piano.forceKeyUp(key);
  return data;
}


describe("piano", function() {
  describe('#forceKeyDown', () => {
    context("given undefined", () => {
      it("should do nothing", () => {
        const piano = newPiano({note: "a",octave: 1}, {note: "a",octave: 1});
        let result = forceKeyDown(piano);
        expect(result).to.equal(null);
      });
    });
    context("given a piano key", () => {
      it("should call _keyDown", () => {
        const key = newPianoKey();
        const piano = newPiano({note: "a",octave: 1}, {note: "a",octave: 1});
        let result = forceKeyDown(piano, key);
        expect(result).to.not.equal(null);
      });
      it("should pass the key to _keyDown", () => {
        const key = newPianoKey();
        const piano = newPiano({note: "a",octave: 1}, {note: "a",octave: 1});
        let result = forceKeyDown(piano, key);
        expect(result).to.deep.equal(key);
      });
    });
    context("given something that is not a piano key", () => {
      it("should do nothing", () => {
        const piano = newPiano({note: "a",octave: 1}, {note: "a",octave: 1});
        let result = forceKeyDown(piano, {});
        expect(result).to.equal(null);
        result = forceKeyDown(piano, "a");
        expect(result).to.equal(null);
        result = forceKeyDown(piano, 1);
        expect(result).to.equal(null);
        result = forceKeyDown(piano, []);
        expect(result).to.equal(null);
      });
    });
  });

  describe('#forceKeyUp', () => {
    context("given undefined", () => {
      it("should do nothing", () => {
        const piano = newPiano({note: "a",octave: 1}, {note: "a",octave: 1});
        let result = forceKeyUp(piano);
        expect(result).to.equal(null);
      });
    });
    context("given a piano key", () => {
      it("should call _keyDown", () => {
        const key = newPianoKey();
        const piano = newPiano({note: "a",octave: 1}, {note: "a",octave: 1});
        let result = forceKeyUp(piano, key);
        expect(result).to.not.equal(null);
      });
      it("should pass the key to _keyDown", () => {
        const key = newPianoKey();
        const piano = newPiano({note: "a",octave: 1}, {note: "a",octave: 1});
        let result = forceKeyUp(piano, key);
        expect(result).to.deep.equal(key);
      });
    });
    context("given something that is not a piano key", () => {
      it("should do nothing", () => {
        const piano = newPiano({note: "a",octave: 1}, {note: "a",octave: 1});
        let result = forceKeyUp(piano, {});
        expect(result).to.equal(null);
        result = forceKeyUp(piano, "a");
        expect(result).to.equal(null);
        result = forceKeyUp(piano, 1);
        expect(result).to.equal(null);
        result = forceKeyUp(piano, []);
        expect(result).to.equal(null);
      });
    });
  });
});