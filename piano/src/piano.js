"use strict";

const pianoUtilities = require('./piano-utilities');
const pianoMouseEvents = require('./piano-mouse-events');
const pianoKeyboardEvents = require('./piano-keyboard-events');
const pianoDOM = require('./piano-DOM');
const pianoClassNames = require('./piano-class-names');
const pianoBuilder = require('./piano-builder');

/*
All piano keys are indexed from 1 to whatever. Not 0
*/
let pianoObj = {
  keyUp: () => {},
  keyDown: () => {},
  _keyDown: function(key) {
    key.classList.remove(pianoClassNames.keyUp);
    key.classList.add(pianoClassNames.keyDown);
    this.keyDown(pianoUtilities.keyNumber(key));
  },
  _keyUp: function(key) {
    key.classList.add(pianoClassNames.keyUp);
    key.classList.remove(pianoClassNames.keyDown);
    this.keyUp(pianoUtilities.keyNumber(key));
  },
  enableMusicalTyping: function(startingKeyNumber = 1) {
    this._keyboardEvents.addKeyboardEvents(this, this._pianoLetters, startingKeyNumber);
    this._pianoLetters.addLettersToKeys(this, startingKeyNumber);
  },
  disableMusicalTyping: function() {
    this._keyboardEvents.removeKeyboardEvents(this);
    this._pianoLetters.removeLettersFromKeys(this);
  },
  get _keyboardEvents() {
    // Musical Typing
    return require('./piano-keyboard-events')(this._pianoLetters);
  },
  get _pianoLetters() {
    return require('./piano-letters');
  }
};
  
function buildPiano(buildFunction) {
  const piano = Object.create(pianoObj);

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

function newPiano(whiteKeysAmount, blackKeysLayout) {
  if (typeof arguments[0] === 'number') {
    return newPianoWithWhiteKeysAmount(arguments[0], arguments[1]);
  }

  if (typeof arguments[0] === 'object') {
    return newPianoWithNotes(arguments[0], arguments[1]);
  }

  return null;
}
global.newPiano = newPiano;