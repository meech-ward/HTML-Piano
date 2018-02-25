/**
 * Create a new Piano html element.
 * @param {*The number of white keys to be presented} whiteKeysAmount 
 * @param {*The number of black keys to present and the order in which they will be presented. An array of objects that look like this `{visible: bool, amount: int}`} blackKeysLayout 
 */
let Piano;
const classNames = {
  whiteKey: 'white-key',
  keyUp: 'key-up',
  keyDown: 'key-down',
  keyHighlighted: 'key-highlighted'
};

/*
All piano keys are indexed from 1 to whatever. Not 0
*/



////// Piano Key Creation
(function(exports) {

  // True if the mouse is currently down
  let mouseDown = false;

  Piano = function(whiteKeysAmount, blackKeysLayout) {
    const pianoElement = pianoElementMake();
    this.blackKeysArray = arrayFromBlackKeys(blackKeysLayout);
    for (let i = 1; i <= whiteKeysAmount; i++) {
      const pianoKeyNumber = pianoKeyNumberFromWhiteKeyNumber(i, this.blackKeysArray);
      whiteKeyMake(pianoElement, i, pianoKeyNumber, whiteKeysAmount);
    }

    this.HTML = pianoElement;
    this.keyUp = this.keyDown = () => {};
    this._keyDown = (key) => {
      key.classList.remove(classNames.keyUp);
      key.classList.add(classNames.keyDown);
      this.keyDown(keyNumber(key));
    }
    this._keyUp = (key) => {
      key.classList.add(classNames.keyUp);
      key.classList.remove(classNames.keyDown);
      this.keyUp(keyNumber(key));
    }
    addPianoKeyEventListeners.bind(this)(pianoElement);
  }

  ////////// Event Listeners

  function addPianoKeyEventListeners(pianoElement) {
    const piano = this;
    for (whiteKey of pianoElement.whiteKeysWrapper.children) {
      whiteKey.addEventListener('mousedown', function(event) {
        if (mouseDown) {return false;}
        mouseDown = true;
        piano._keyDown(this);
        return false;
      });
      whiteKey.addEventListener('mouseup', function(event) {
        if (!mouseDown) {return false;}
        mouseDown = false;
        piano._keyUp(this);
        return false;
      });
      whiteKey.addEventListener('mouseout', function(event) {
        if (!mouseDown) {return false;}
        piano._keyUp(this);
        return false;
      });
      whiteKey.addEventListener('mouseover', function(event) {
        if (!mouseDown) {return false;}
        piano._keyDown(this);
        return false;
      });
      whiteKey.addEventListener('click', function(event) {
      });
    }
  }



  ////////// Element Creation

  function pianoElementMake() {
    const pianoElement = document.createElement('div');
    pianoElement.classList.add('piano');

    const whiteKeysWrapper = document.createElement('div');
    whiteKeysWrapper.classList.add('white-keys');
    pianoElement.appendChild(whiteKeysWrapper);
    pianoElement.whiteKeysWrapper = whiteKeysWrapper
    
    const blackKeysWrapper = document.createElement('div');
    blackKeysWrapper.classList.add('black-keys');
    pianoElement.appendChild(blackKeysWrapper);
    pianoElement.blackKeysWrapper = blackKeysWrapper;

    return pianoElement;
  }

  function whiteKeyMake(pianoElement, whiteKeyNumber, pianoKeyNumber, totalWhiteKeys) {
    const key = document.createElement('div');
    key.classList.add('piano-key', classNames.whiteKey, classNames.keyUp, 'white-key-'+whiteKeyNumber, 'piano-key-'+pianoKeyNumber);
    pianoElement.whiteKeysWrapper.appendChild(key);
    const keyWidthPercent = 100.0/totalWhiteKeys;
    key.style.cssText = `width: ${keyWidthPercent}%`;
    return key;
  }

  function blackKeyMake(pianoElement, whiteKeyNumber, pianoKeyNumber) {
    const key = document.createElement('div');
    key.classList.add('piano-key', classNames.whiteKey, 'white-key-'+whiteKeyNumber, 'piano-key-'+pianoKeyNumber);
    pianoElement.whiteKeysWrapper.appendChild(key);
  }

  ///////// Helpers


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

})(this);
