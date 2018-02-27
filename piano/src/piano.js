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
};

function newPiano(whiteKeysAmount, blackKeysLayout) {
  const piano = Object.create(pianoObj);
  const pianoElement = pianoDOM.pianoElementMake.call(pianoObj);
  piano.HTML = pianoElement;

  piano.blackKeysArray = pianoUtilities.arrayFromBlackKeys(blackKeysLayout);

  const blackKeyWidthPercent = 100.0/whiteKeysAmount/1.5;
  const whiteKeyWidthPercent = 100.0/whiteKeysAmount;

  (function() {
    for (let i = 1; i <= whiteKeysAmount; i++) {
      const pianoKeyNumber = pianoUtilities.pianoKeyNumberFromWhiteKeyNumber(i, this.blackKeysArray);
      pianoDOM.whiteKeyMake.call(this, i, whiteKeyWidthPercent, pianoKeyNumber, whiteKeysAmount);
    }
  }).call(piano);

  (function() {
    let blackKeyNumber = 1;
    
    let numberOfWhitesSinceLastBlack = 0;
    let isFirst = true;
    for (let i = 0; i <= this.blackKeysArray.length-1; i++) {
      if (this.blackKeysArray[i] === 0) {
        numberOfWhitesSinceLastBlack++;
        continue;
      }
      pianoDOM.blackBlankMake.call(this, numberOfWhitesSinceLastBlack, blackKeyWidthPercent, whiteKeyWidthPercent, isFirst);
      const numberOfWhites = i;
      pianoDOM.blackKeyMake.call(this, blackKeyNumber, blackKeyWidthPercent, numberOfWhites+blackKeyNumber, whiteKeysAmount);
      blackKeyNumber++;
      numberOfWhitesSinceLastBlack = 0;
      isFirst = false;
    }
  }).call(piano);

  (function() {
  this._keyDown = (key) => {
    key.classList.remove(pianoClassNames.keyUp);
    key.classList.add(pianoClassNames.keyDown);
    this.keyDown(pianoUtilities.keyNumber(key));
  }
  this._keyUp = (key) => {
    key.classList.add(pianoClassNames.keyUp);
    key.classList.remove(pianoClassNames.keyDown);
    this.keyUp(pianoUtilities.keyNumber(key));
  }
}).call(piano);

  pianoEvents.addPianoKeyEventListeners(piano);

  return piano;
}
window.newPiano = newPiano;
