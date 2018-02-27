const pianoClassNames = require('./piano-class-names');
const pianoLetters = require('./piano-letters');

// True if the mouse is currently down
let mouseDown = false;

function addMouseEventListenersToKeys(piano, keys) {
  for (key of keys) {
    key.addEventListener('mousedown', function(event) {
      console.log("mouse down");
      if (mouseDown) {return false;}
      mouseDown = true;
      piano._keyDown(this);
      // return false;
    });
    key.addEventListener('mouseup', function(event) {
      if (!mouseDown) {return false;}
      mouseDown = false;
      piano._keyUp(this);
      // return false;
    });
    key.addEventListener('mouseout', function(event) {
      if (!mouseDown) {return false;}
      piano._keyUp(this);
      // return false;
    });
    key.addEventListener('mouseover', function(event) {
      if (!mouseDown) {return false;}
      piano._keyDown(this);
      // return false;
    });
  }
}

function addKeyboardEvents(piano) {
  let keysDown = {};
  const startingKeyNumber = 13;
  pianoLetters.addLettersToKeys(piano, startingKeyNumber);

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

function addPianoKeyEventListeners(piano) {
  addMouseEventListenersToKeys(piano, piano.whiteKeysWrapper.children);
  addMouseEventListenersToKeys(piano, piano.blackKeysWrapper.children);
  addKeyboardEvents(piano);
}
exports.addPianoKeyEventListeners = addPianoKeyEventListeners;
