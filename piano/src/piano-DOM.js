// Create the piano DOM elements

module.exports = function(document) {

const pianoClassNames = require('./piano-class-names');


function pianoElementMake() {
  const pianoElement = document.createElement('div');
  pianoElement.classList.add(pianoClassNames.piano);

  const whiteKeysWrapper = document.createElement('div');
  whiteKeysWrapper.classList.add(pianoClassNames.whiteKeys);
  pianoElement.appendChild(whiteKeysWrapper);
  this.whiteKeysWrapper = whiteKeysWrapper;
  this.whiteKeys = [];
  
  const blackKeysWrapper = document.createElement('div');
  blackKeysWrapper.classList.add(pianoClassNames.blackKeys);
  pianoElement.appendChild(blackKeysWrapper);
  this.blackKeysWrapper = blackKeysWrapper;
  this.blackKeys = [];

  return pianoElement;
}
exports.pianoElementMake = pianoElementMake;

function whiteKeyMake(whiteKeyNumber, keyWidthPercent, pianoKeyNumber, totalWhiteKeys) {
  const key = document.createElement('div');
  key.classList.add(pianoClassNames.pianoKey, pianoClassNames.whiteKey, pianoClassNames.keyUp, 'white-key-'+whiteKeyNumber, pianoClassNames.pianoKeyNumber(pianoKeyNumber));
  this.whiteKeysWrapper.appendChild(key);
  this.whiteKeys.push(key);
  key.style.cssText = `width: ${keyWidthPercent}%`;
  return key;
}
exports.whiteKeyMake = whiteKeyMake;

function blackKeyMake(blackKeyNumber, keyWidthPercent, pianoKeyNumber, totalWhiteKeys) {
  const key = document.createElement('div');
  key.classList.add(pianoClassNames.pianoKey, pianoClassNames.blackKey, 'black-key-'+blackKeyNumber, pianoClassNames.pianoKeyNumber(pianoKeyNumber));
  this.blackKeysWrapper.appendChild(key);
  this.blackKeys.push(key);
  key.style.cssText = `width: ${keyWidthPercent}%`;
  return key;
}
exports.blackKeyMake = blackKeyMake;

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
exports.blackBlankMake = blackBlankMake;

return exports;
}