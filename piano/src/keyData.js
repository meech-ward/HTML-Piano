const { classEnding } = require('./utilities');
const classNames = require('./piano-class-names');

function keyNumber(key) {
  const pianoKeyClass = classNames.pianoKeyNumber();
  const result = classEnding(key, pianoKeyClass);
  if (!result) {
    return null;
  }
  return Number(result);
}
exports.keyNumber = keyNumber;

function keyNote(key) {
  const pianoKeyClass = classNames.pianoNote();
  const result = classEnding(key, pianoKeyClass);
  if (!result) {
    return null;
  }
  return result;
}
exports.keyNote = keyNote;

function keyOctave(key) {
  const pianoKeyClass = classNames.pianoOctave();
  const result = classEnding(key, pianoKeyClass);
  if (!result) {
    return null;
  }
  return Number(result);
}
exports.keyOctave = keyOctave;
