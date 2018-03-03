const pianoClassNames = require('./piano-class-names');

function addKeyboardEvents(piano, pianoLetters, startingKeyNumber) {
  let keysDown = {};

  document.addEventListener("keydown", function(event) {
    if (keysDown[event.key]) {
      return;
    }

    const key = pianoLetters.keyForLetter(event.key, piano, startingKeyNumber);
    if (!key) {
      return;
    }
    
    piano._keyDown(key);

    keysDown[event.key] = true;
  });

  document.addEventListener("keyup", function(event) {
    const key = pianoLetters.keyForLetter(event.key, piano, startingKeyNumber);
    if (!key) {
      return;
    }

    piano._keyUp(key);

    keysDown[event.key] = null;
  });
}
exports.addKeyboardEvents = addKeyboardEvents;
