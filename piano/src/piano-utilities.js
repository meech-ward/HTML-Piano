const classNames = require("./piano-class-names")

function pianoKeyNumberFromWhiteKeyNumber(whiteKeyNumber = 0, blackKeysArray = []) {
  // 5 would be 8 because 3 black keys are there before 5
  let numberOfBlackKeys = 0;
  for (let i = 0; i < whiteKeyNumber; i++) {
    if (blackKeysArray[i] == 1) {
      numberOfBlackKeys++;
    }
  }
  return whiteKeyNumber + numberOfBlackKeys;
}
exports.pianoKeyNumberFromWhiteKeyNumber = pianoKeyNumberFromWhiteKeyNumber;

function pianoKeyNumberFromBlackKeyNumber(blackKeyNumber, blackKeysArray) {

}
exports.pianoKeyNumberFromBlackKeyNumber = pianoKeyNumberFromBlackKeyNumber;

// Returns an array of 1 and 0s based on the black keys layout
function arrayFromBlackKeys(blackKeysLayout) {
  blackKeysLayout = blackKeysLayout || [];
  
  const array = []
  for (layout of blackKeysLayout) {
    const value = layout.visible ? 1 : 0;
    for (let i = 0; i < layout.amount; i++) {
      array.push(value);
    }
  }
  return array;
}
exports.arrayFromBlackKeys = arrayFromBlackKeys;

function keyNumber(key) {
  const pianoKeyClass = 'piano-key-';
  if (!key) {
    return null;
  }
  if (!key.classList) {
    return null;
  }
  let pianoKeyClassNumber = null;
  const classList = key.classList;
  for (elementClass of classList) {
    if (elementClass.startsWith(pianoKeyClass)) {
      pianoKeyClassNumber = Number(elementClass.substr(pianoKeyClass.length));
      break;
    }
  }
  return pianoKeyClassNumber;
}
exports.keyNumber = keyNumber;

function keyNote(key) {
  const pianoKeyClass = 'piano-note-';
  if (!key) {
    return null;
  }
  if (!key.classList) {
    return null;
  }
  let result = null;
  const classList = key.classList;
  for (elementClass of classList) {
    if (elementClass.startsWith(pianoKeyClass)) {
      result = elementClass.substr(pianoKeyClass.length);
      break;
    }
  }
  return result;
}
exports.keyNote = keyNote;

function keyOctave(key) {
  const pianoKeyClass = 'piano-octave-';
  if (!key) {
    return null;
  }
  if (!key.classList) {
    return null;
  }
  let result = null;
  const classList = key.classList;
  for (elementClass of classList) {
    if (elementClass.startsWith(pianoKeyClass)) {
      result = Number(elementClass.substr(pianoKeyClass.length));
      break;
    }
  }
  return result;
}
exports.keyOctave = keyOctave;


// return 'piano-key-'+number

//   return 'piano-note-'+note

//   return 'piano-octave-'+octave