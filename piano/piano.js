/**
 * Create a new Piano html element.
 * @param {*The number of white keys to be presented} whiteKeysAmount 
 * @param {*The number of black keys to present and the order in which they will be presented. An array of objects that look like this `{visible: bool, amount: int}`} blackKeysLayout 
 */
let Piano;
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

(function(exports) {

  // True if the mouse is currently down
  let mouseDown = false;

  Piano = function(whiteKeysAmount, blackKeysLayout) {
    const pianoElement = pianoElementMake.call(this);
    this.blackKeysArray = arrayFromBlackKeys(blackKeysLayout);

    const blackKeyWidthPercent = 100.0/whiteKeysAmount/1.5;
    const whiteKeyWidthPercent = 100.0/whiteKeysAmount;

    (function() {
      for (let i = 1; i <= whiteKeysAmount; i++) {
        const pianoKeyNumber = pianoKeyNumberFromWhiteKeyNumber(i, this.blackKeysArray);
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
      this.keyDown(keyNumber(key));
    }
    this._keyUp = (key) => {
      key.classList.add(classNames.keyUp);
      key.classList.remove(classNames.keyDown);
      this.keyUp(keyNumber(key));
    }
    addPianoKeyEventListeners.call(this);
  }

  ////////// Event Listeners

  function addPianoKeyEventListeners() {
    const piano = this;
    function addEventListenersToKeys(keys) {
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
    addEventListenersToKeys(this.whiteKeysWrapper.children);
    addEventListenersToKeys(this.blackKeysWrapper.children);
  }

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
