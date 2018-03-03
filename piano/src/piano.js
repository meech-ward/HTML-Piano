const pianoUtilities = require('./piano-utilities');
const pianoMouseEvents = require('./piano-mouse-events');
const pianoKeyboardEvents = require('./piano-keyboard-events');
const pianoDOM = require('./piano-DOM');
const pianoClassNames = require('./piano-class-names');

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
  }
};

function buildWhiteKeys() {
  for (let i = 1; i <= this.whiteKeysAmount; i++) {
    const pianoKeyNumber = pianoUtilities.pianoKeyNumberFromWhiteKeyNumber(i, this.blackKeysArray);
    pianoDOM.whiteKeyMake.call(this, i, this.whiteKeyWidthPercent, pianoKeyNumber, this.whiteKeysAmount);
  }
}

function buildBlackKeys() {
  let blackKeyNumber = 1;
    
  let numberOfWhitesSinceLastBlack = 0;
  let isFirst = true;
  for (let i = 0; i <= this.blackKeysArray.length-1; i++) {
    if (this.blackKeysArray[i] === 0) {
      numberOfWhitesSinceLastBlack++;
      continue;
    }
    pianoDOM.blackBlankMake.call(this, numberOfWhitesSinceLastBlack, this.blackKeyWidthPercent, this.whiteKeyWidthPercent, isFirst);
    const numberOfWhites = i;
    pianoDOM.blackKeyMake.call(this, blackKeyNumber, this.blackKeyWidthPercent, numberOfWhites+blackKeyNumber, this.whiteKeysAmount);
    blackKeyNumber++;
    numberOfWhitesSinceLastBlack = 0;
    isFirst = false;
  }
}

function newPianoWithWhiteKeysAmount(whiteKeysAmount, blackKeysLayout) {
  const piano = Object.create(pianoObj);

  // Properties
  piano.whiteKeysAmount = whiteKeysAmount;
  piano.blackKeysLayout = blackKeysLayout;
  piano.blackKeyWidthPercent = 100.0/whiteKeysAmount/1.5;
  piano.whiteKeyWidthPercent = 100.0/whiteKeysAmount;

  // Utility
  piano.blackKeysArray = pianoUtilities.arrayFromBlackKeys(blackKeysLayout);

  // DOM
  piano.HTML = pianoDOM.pianoElementMake.call(piano);
  buildWhiteKeys.call(piano);
  buildBlackKeys.call(piano);

  // EventListeners
  pianoMouseEvents.addPianoKeyEventListeners(piano);

  // Musical Typing
  piano.enableMusicalTyping = function(startingKeyNumber = 1) {
    const pianoLetters = require('./piano-letters');
    const addKeyboardEvents = require('./piano-keyboard-events').addKeyboardEvents;
    addKeyboardEvents(this, pianoLetters, startingKeyNumber);
    pianoLetters.addLettersToKeys(this, startingKeyNumber);
  }
  piano.disableMusicalTyping = function() {

  }

  return piano;
}



function newPianoWithNotes(startNote, endNote) {
  const piano = Object.create(pianoObj);

  const blackNotes = {'c':'c#', 'd': 'd#', 'f': 'f#', 'g': 'g#', 'a': 'a#'};
  const whiteNotes = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

  return piano;
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
window.newPiano = newPiano;
