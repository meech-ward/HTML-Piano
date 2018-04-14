const chai = require('chai');
const expect = chai.expect;

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const window = MockBrowser.createWindow();
const document = MockBrowser.createDocument();
const newPiano = require('../piano/src/piano')(window).newPiano;
const pianoDOM = require('../piano/src/piano-DOM')(document);

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
    });
  });
});