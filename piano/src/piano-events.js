
// True if the mouse is currently down
let mouseDown = false;

function addEventListenersToKeys(piano, keys) {
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

function addPianoKeyEventListeners(piano) {
  addEventListenersToKeys(piano, piano.whiteKeysWrapper.children);
  addEventListenersToKeys(piano, piano.blackKeysWrapper.children);
}

exports.addPianoKeyEventListeners = addPianoKeyEventListeners;
