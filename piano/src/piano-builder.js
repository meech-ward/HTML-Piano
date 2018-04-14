module.exports = function(document) {
const pianoUtilities = require('./piano-utilities');
const pianoDOM = require('./piano-DOM')(document || window.document);
const PianoBuilderError = require('./piano-build-error');
const pianoClassNames = require('./piano-class-names');
  
function buildWhiteKeys() {
  for (let i = 1; i <= this.whiteKeysAmount; i++) {
    const pianoKeyNumber = pianoUtilities.pianoKeyNumberFromWhiteKeyNumber(i, this.blackKeysArray);
    pianoDOM.whiteKeyMake.call(this, i, this.whiteKeyWidthPercent, pianoKeyNumber, this.whiteKeysAmount);
  }
}

function buildBlackKeys() {
  let blackKeyNumber = 1;
    
  let numberOfWhitesSinceLastBlack = 0;
  let isFirst = true;
  for (let i = 0; i <= this.blackKeysArray.length-1; i++) {
    if (this.blackKeysArray[i] === 0) {
      numberOfWhitesSinceLastBlack++;
      continue;
    }
    pianoDOM.blackBlankMake.call(this, numberOfWhitesSinceLastBlack, this.blackKeyWidthPercent, this.whiteKeyWidthPercent, isFirst);
    const numberOfWhites = i;
    pianoDOM.blackKeyMake.call(this, blackKeyNumber, this.blackKeyWidthPercent, numberOfWhites+blackKeyNumber, this.whiteKeysAmount);
    blackKeyNumber++;
    numberOfWhitesSinceLastBlack = 0;
    isFirst = false;
  }
}

function buildPianoWithWhiteKeysAmount(whiteKeysAmount, blackKeysLayout) {
  // Properties
  this.whiteKeysAmount = whiteKeysAmount;
  this.blackKeysLayout = blackKeysLayout;
  this.blackKeyWidthPercent = 100.0/whiteKeysAmount/1.5;
  this.whiteKeyWidthPercent = 100.0/whiteKeysAmount;

  // Utility
  this.blackKeysArray = pianoUtilities.arrayFromBlackKeys(blackKeysLayout);

  // DOM
  this.HTML = pianoDOM.pianoElementMake.call(this);
  buildWhiteKeys.call(this);
  buildBlackKeys.call(this);

  return this;
}
exports.buildPianoWithWhiteKeysAmount = buildPianoWithWhiteKeysAmount;


const noteData = {
  whiteToBlackKeyMap: {'c':'c#', 'd': 'd#', 'f': 'f#', 'g': 'g#', 'a': 'a#'},
  nextKeyMap: {'c':'c#', 'c#': 'd', 'd': 'd#', 'd#': 'e', 'e': 'f', 'f': 'f#', 'f#': 'g', 'g': 'g#', 'g#': 'a', 'a': 'a#', 'a#' : 'b', 'b': 'c'},
  blackNotes: ['c#', 'd#', 'f#', 'g#','a#'],
  whiteNotes: ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
  octaves: [0,1,2,3,4,5,6,7,8]
};

/*
Note data has a note and an octave, valid octaves are 0 - 8
https://en.wikipedia.org/wiki/Piano
*/

function buildPianoWithNotes(startNoteData, endNoteData) {
  const keys = keysFromNotes(startNoteData, endNoteData);

  this.startNoteData = startNoteData;
  this.endNoteData = endNoteData;

  const piano = buildPianoWithWhiteKeysAmount.call(this, keys.whiteKeysAmount, keys.blackKeyLayout);

  let pianoKeyNumber = 1;
  let currentOctave = startNoteData.octave;
  let currentNote = startNoteData.note;

  
  for(;;) {
    addNoteAndOctaveToKey(piano, pianoKeyNumber, currentNote, currentOctave);
    
    if (currentNote === endNoteData.note && currentOctave === endNoteData.octave) {
      // Far enough, stop now
      break;
    }

    pianoKeyNumber++;
    currentNote = noteData.nextKeyMap[currentNote];
    if (currentNote === noteData.whiteNotes[0]) {
      currentOctave++;
    }
  }
}
exports.buildPianoWithNotes = buildPianoWithNotes;

function addNoteAndOctaveToKey(piano, keyNumber, note, octave) {
  const keyClass = pianoClassNames.pianoKeyNumber(keyNumber);
  const key = piano.HTML.querySelector("."+keyClass);
  key.classList.add(pianoClassNames.pianoNote(note));
  key.classList.add(pianoClassNames.pianoOctave(octave));
}

function validateNoteData(startNoteData, endNoteData) {
  if (!startNoteData || !endNoteData) {
    throw new PianoBuilderError();
  }

  if (!noteData.whiteNotes.includes(startNoteData.note) && !noteData.blackNotes.includes(startNoteData.note)) {
    // Invalid start note
    throw new PianoBuilderError("Invalid Start Note");
  }
  if (!noteData.octaves.includes(startNoteData.octave)) {
    // Invalid start octave
    throw new PianoBuilderError("Invalid Start Octave");
  }

  if (!noteData.whiteNotes.includes(endNoteData.note) && !noteData.blackNotes.includes(endNoteData.note)) {
    // Invalid end note
    throw new PianoBuilderError("Invalid End Note");
  }
  if (!noteData.octaves.includes(endNoteData.octave)) {
    // Invalid end octave
    throw new PianoBuilderError("Invalid End Octave");
  }

  if (startNoteData.octave > endNoteData.octave) {
    throw new PianoBuilderError("Can't build a piano if the starting octave is larger than the ending octave");
  }

  if (startNoteData.octave === endNoteData.octave) {
    const startIndex = noteData.whiteNotes.indexOf(startNoteData.note);
    const endIndex = noteData.whiteNotes.indexOf(endNoteData.note)
    if (startIndex > endIndex) {
      throw new PianoBuilderError();
    }
  }

  // Sharp is currently not suported for start and end notes
  if (noteData.blackNotes.includes(startNoteData.note) || noteData.blackNotes.includes(endNoteData.note)) {
    throw new PianoBuilderError();
  }
}

/// Only supports start and end normal notes, no sharp notes.
function keysFromNotes(startNoteData, endNoteData) {
  validateNoteData(startNoteData, endNoteData);
  
  let startNoteIndex = null;
  let endNoteIndex = null;
  for (let i = 0; i < noteData.whiteNotes.length; i++) {
    const whiteNote = noteData.whiteNotes[i];

    if (!startNoteIndex) {
      if (whiteNote === startNoteData.note) {
        startNoteIndex = i;
      }
    }

    if (!endNoteIndex) {
      if (whiteNote === endNoteData.note) {
        endNoteIndex = i;
      }
    }
  }

  const totalWhites = noteData.whiteNotes.length;

  let whiteKeysAmount = endNoteIndex - startNoteIndex + 1;
  whiteKeysAmount += totalWhites * (endNoteData.octave - startNoteData.octave);

  let blackKeyLayout = [];
  function addToBlackKeyLayout(visible, amount) {
    blackKeyLayout.push({visible, amount});
  }

  let blanks = 1; // because there is always an empty for the very first
  let solids = 0;
  let lastBlackNote = null;
  for (let i = startNoteIndex + (startNoteData.octave * totalWhites); i < endNoteIndex + (endNoteData.octave * totalWhites); i++) {
    const whiteIndex = i % totalWhites;
    const whiteNote = noteData.whiteNotes[whiteIndex];
    const blackNote = noteData.whiteToBlackKeyMap[whiteNote];
    
    if (blackNote) {
      solids++;
    } else {
      blanks++;
    }
    
    if (!blackNote && lastBlackNote) {
      addToBlackKeyLayout(true, solids);
      solids = 0;
    }
    
    if (blackNote && !lastBlackNote) {
      addToBlackKeyLayout(false, blanks);
      blanks = 0;
    }
    
    lastBlackNote = blackNote
  }

  if (solids > 0) {
    addToBlackKeyLayout(true, solids);
  }

  return {whiteKeysAmount, blackKeyLayout};
}
exports.keysFromNotes = keysFromNotes;

return exports;
}
