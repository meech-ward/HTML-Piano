const pianoUtilities = require('./piano-utilities');
const pianoEvents = require('./piano-events');

/**
 * Create a new Piano html element.
 * @param {*The number of white keys to be presented} whiteKeysAmount 
 * @param {*The number of black keys to present and the order in which they will be presented. An array of objects that look like this `{visible: bool, amount: int}`} blackKeysLayout 
 */
const classNames = {
  whiteKey: 'white-key',
  blackKey: 'black-key',
  keyUp: 'key-up',
  keyDown: 'key-down',
  keyHighlighted: 'key-highlighted',
  piano: 'piano',
  whiteKeys: 'white-keys',
  blackKeys: 'black-keys'
};

/*
All piano keys are indexed from 1 to whatever. Not 0
*/
function Piano(whiteKeysAmount, blackKeysLayout) {
  const pianoElement = pianoElementMake.call(this);
  this.blackKeysArray = pianoUtilities.arrayFromBlackKeys(blackKeysLayout);

  const blackKeyWidthPercent = 100.0/whiteKeysAmount/1.5;
  const whiteKeyWidthPercent = 100.0/whiteKeysAmount;

  (function() {
    for (let i = 1; i <= whiteKeysAmount; i++) {
      const pianoKeyNumber = pianoUtilities.pianoKeyNumberFromWhiteKeyNumber(i, this.blackKeysArray);
      whiteKeyMake.call(this, i, whiteKeyWidthPercent, pianoKeyNumber, whiteKeysAmount);
    }
  }).call(this);

  (function() {
    let blackKeyNumber = 1;
    
    let numberOfWhitesSinceLastBlack = 0;
    let isFirst = true;
    for (let i = 0; i <= this.blackKeysArray.length-1; i++) {
      if (this.blackKeysArray[i] === 0) {
        numberOfWhitesSinceLastBlack++;
        continue;
      }
      blackBlankMake.call(this, numberOfWhitesSinceLastBlack, blackKeyWidthPercent, whiteKeyWidthPercent, isFirst);
      const numberOfWhites = i;
      blackKeyMake.call(this, blackKeyNumber, blackKeyWidthPercent, numberOfWhites+blackKeyNumber, whiteKeysAmount);
      blackKeyNumber++;
      numberOfWhitesSinceLastBlack = 0;
      isFirst = false;
    }
  }).call(this);

  this.HTML = pianoElement;
  this.keyUp = this.keyDown = () => {};
  this._keyDown = (key) => {
    key.classList.remove(classNames.keyUp);
    key.classList.add(classNames.keyDown);
    this.keyDown(pianoUtilities.keyNumber(key));
  }
  this._keyUp = (key) => {
    key.classList.add(classNames.keyUp);
    key.classList.remove(classNames.keyDown);
    this.keyUp(pianoUtilities.keyNumber(key));
  }
  pianoEvents.addPianoKeyEventListeners(this);
}

window.Piano = Piano;

////////// Element Creation

function pianoElementMake() {
  const pianoElement = document.createElement('div');
  pianoElement.classList.add(classNames.piano);

  const whiteKeysWrapper = document.createElement('div');
  whiteKeysWrapper.classList.add(classNames.whiteKeys);
  pianoElement.appendChild(whiteKeysWrapper);
  this.whiteKeysWrapper = whiteKeysWrapper
  
  const blackKeysWrapper = document.createElement('div');
  blackKeysWrapper.classList.add(classNames.blackKeys);
  pianoElement.appendChild(blackKeysWrapper);
  this.blackKeysWrapper = blackKeysWrapper;

  return pianoElement;
}

function whiteKeyMake(whiteKeyNumber, keyWidthPercent, pianoKeyNumber, totalWhiteKeys) {
  const key = document.createElement('div');
  key.classList.add('piano-key', classNames.whiteKey, classNames.keyUp, 'white-key-'+whiteKeyNumber, 'piano-key-'+pianoKeyNumber);
  this.whiteKeysWrapper.appendChild(key);
  key.style.cssText = `width: ${keyWidthPercent}%`;
  return key;
}

function blackKeyMake(blackKeyNumber, keyWidthPercent, pianoKeyNumber, totalWhiteKeys) {
  const key = document.createElement('div');
  key.classList.add('piano-key', classNames.blackKey, 'black-key-'+blackKeyNumber, 'piano-key-'+pianoKeyNumber);
  this.blackKeysWrapper.appendChild(key);
  key.style.cssText = `width: ${keyWidthPercent}%`;
  return key;
}
function blackBlankMake(numberOfWhitesSinceLastBlack, blackKeyWidthPercent, whiteKeyWidthPercent, isFirst = false) {
  const blank = document.createElement('div');
  blank.classList.add('black-key-blank');
  this.blackKeysWrapper.appendChild(blank);

  const blankWidthPercent = isFirst ? whiteKeyWidthPercent-(blackKeyWidthPercent/2.0) : whiteKeyWidthPercent-blackKeyWidthPercent;
  if (isFirst) {
    numberOfWhitesSinceLastBlack--;
  }

  let currentWidthPercent = blankWidthPercent;
  for (let i = 0; i < numberOfWhitesSinceLastBlack; i++) {
    currentWidthPercent += whiteKeyWidthPercent;
  }

  blank.style.cssText = `width: ${currentWidthPercent}%; height: 10px;`;
  return blank;
}