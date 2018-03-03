const pianoClassNames = require('./piano-class-names');

module.exports = function(pianoLetters) {
  let keysDown = {};
  let pianos = [];

  exports = module.exports;

function addKeyDownListener() {
  document.addEventListener("keydown", function(event) {
    if (keysDown[event.key]) {
      return;
    }

    for (piano of pianos) {

    const key = pianoLetters.keyForLetter(event.key, piano, piano.keyboardStartingKeyNumber);
    if (!key) {
      continue;
    }
    
      piano._keyDown(key);
    }

    keysDown[event.key] = true;
  });
}
addKeyDownListener();

function addKeyUpListener() {
  document.addEventListener("keyup", function(event) {

    for (piano of pianos) {

    const key = pianoLetters.keyForLetter(event.key, piano, piano.keyboardStartingKeyNumber);
    if (!key) {
      continue;
    }

      piano._keyUp(key);
    }

    keysDown[event.key] = null;
  });
}
addKeyUpListener();

function addKeyboardEvents(piano, pianoLetters, startingKeyNumber) {
  piano.keyboardStartingKeyNumber = startingKeyNumber;
  pianos.push(piano);
}
exports.addKeyboardEvents = addKeyboardEvents;

function removeKeyboardEvents(piano) {
  // Remove piano from array
  const index = pianos.indexOf(piano);
  if (index > -1) {
    pianos.splice(index, 1);
  }
}
exports.removeKeyboardEvents = removeKeyboardEvents;

return exports;
}
