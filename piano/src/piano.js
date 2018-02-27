const pianoUtilities = require('./piano-utilities');
const pianoEvents = require('./piano-events');
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

function newPiano(whiteKeysAmount, blackKeysLayout) {
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
  pianoEvents.addPianoKeyEventListeners(piano);

  return piano;
}
window.newPiano = newPiano;
