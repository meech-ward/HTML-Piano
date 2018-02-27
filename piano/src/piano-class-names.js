const classNames = {
  pianoKey: 'piano-key',
  whiteKey: 'white-key',
  blackKey: 'black-key',
  keyUp: 'key-up',
  keyDown: 'key-down',
  keyHighlighted: 'key-highlighted',
  piano: 'piano',
  whiteKeys: 'white-keys',
  blackKeys: 'black-keys',
  pianoKeyNumber: (number) => {
    return 'piano-key-'+number
  }
};
module.exports = classNames;