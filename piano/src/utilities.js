const classNames = require("./piano-class-names");

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

//// Class stuff

function classEnding(element, classStart) {
  if (!element) {
    return null;
  }
  if (!element.classList) {
    return null;
  }
  let result = null;
  const classList = element.classList;
  for (elementClass of classList) {
    if (elementClass.startsWith(classStart)) {
      result = elementClass.substr(classStart.length);
      break;
    }
  }
  return result;
}
exports.classEnding = classEnding;