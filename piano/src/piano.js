"use strict";

module.exports = function(pianoDOM) {
const pianoUtilities = require('./piano-utilities');
const pianoMouseEvents = require('./piano-mouse-events');
const pianoClassNames = require('./piano-class-names');
const pianoBuilder = require('./build/piano-builder')(pianoDOM);

/*
All piano keys are indexed from 1 to whatever. Not 0
*/
let Piano = {
  keyUp: () => {},
  keyDown: () => {},
  forceKeyDown: function(key) {
    if (!key || !key.classList) {
      return;
    }
    this._keyDown(key);
  },
  forceKeyUp: function(key) {
    if (!key || !key.classList) {
      return;
    }
    this._keyUp(key);
  },
  _keyDown: function(key) {
    key.classList.remove(pianoClassNames.keyUp);
    key.classList.add(pianoClassNames.keyDown);
    this.keyDown(key);
  },
  _keyUp: function(key) {
    key.classList.add(pianoClassNames.keyUp);
    key.classList.remove(pianoClassNames.keyDown);
    this.keyUp(key);
  },
  get totalKeys() {
    return this.numberOfWhiteKeys + this.numberOfBlackKeys;
  },
  keyOctave(key) {
    return pianoUtilities.keyOctave(key);
  },
  keyNumber(key) {
    return pianoUtilities.keyNumber(key);
  },
  keyNote(key) {
    return pianoUtilities.keyNote(key);
  }
};
  
function buildPiano(buildFunction) {
  const piano = Object.create(Piano);

  buildFunction(piano);
  
  // EventListeners
  pianoMouseEvents.addPianoKeyEventListeners(piano);

  return piano;
}

function newPianoWithWhiteKeysAmount(whiteKeysAmount, blackKeysLayout) {
  return buildPiano((piano) => {
    pianoBuilder.buildPianoWithWhiteKeysAmount.call(piano, whiteKeysAmount, blackKeysLayout);
  });
}

function newPianoWithNotes(startNote, endNote) {
  return buildPiano((piano) => {
    pianoBuilder.buildPianoWithNotes.call(piano, startNote, endNote);
  });
}

function newPiano() {
  if (typeof arguments[0] === 'number') {
    // whiteKeysAmount, blackKeysLayout
    return newPianoWithWhiteKeysAmount(arguments[0], arguments[1]);
  }

  if (typeof arguments[0] === 'object') {
    // startNote, endNote
    return newPianoWithNotes(arguments[0], arguments[1]);
  }

  return null;
}

return {newPiano};
}