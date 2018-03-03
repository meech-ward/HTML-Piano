const pianoClassNames = require('./piano-class-names');

function keyArray(piano) {
  const whiteLetters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''];
  const blackLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];
  let combinedArray = [];

  for (let index = 0; index < piano.whiteKeysAmount; index++) {
    const black = piano.blackKeysArray[index];
    if (black == 1) {
      if (index < blackLetters.length) {
        combinedArray.push(blackLetters[index]);
      }
    }
    if (index < whiteLetters.length) {
      combinedArray.push(whiteLetters[index]);
    }
  }

  return combinedArray;
}
exports.keyArray = keyArray;

function keyForLetter(letter, piano, startingKeyNumber) {
  const letters = keyArray(piano);

  for (let index = 0; index < letters.length; index++)
    if (letter === letters[index]) {
      const keyClass = pianoClassNames.pianoKeyNumber(index+startingKeyNumber);
      const keys = piano.HTML.querySelectorAll("."+keyClass);
      return keys.length > 0 ? keys[0] : null;
    }
    return null;
}
exports.keyForLetter = keyForLetter;

function addLettersToKeys(piano, startingKeyNumber) {
  const letters = keyArray(piano);
  for (const letter of letters) {
    const key = keyForLetter(letter, piano, startingKeyNumber);
    if (!key) {
      continue;
    }
    const pTag = document.createElement('p');
    pTag.classList.add('musical-typing-letter');
    pTag.innerText = letter;
    key.appendChild(pTag);
  }
}
exports.addLettersToKeys = addLettersToKeys;

function removeLettersFromKeys(piano) {
  const textElements = piano.HTML.querySelectorAll('.musical-typing-letter');
  for (const element of textElements) {
    element.remove();
  }
}
exports.removeLettersFromKeys = removeLettersFromKeys;