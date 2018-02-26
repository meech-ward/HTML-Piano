document.addEventListener("DOMContentLoaded", () => {

  createBigPiano();
  createSmallPiano();

  let pianoSynth = Synth.createInstrument('piano');

  function createBigPiano() {
    const whiteKeys = 28;
    const blackKeys = [
      {visible: false, amount: 1}, 
      {visible: true, amount: 2},
      {visible: false, amount: 1},
      {visible: true, amount: 3},
      {visible: false, amount: 1},
      {visible: true, amount: 2},
      {visible: false, amount: 1},
      {visible: true, amount: 3},
      {visible: false, amount: 1},
      {visible: true, amount: 2},
      {visible: false, amount: 1},
      {visible: true, amount: 3},
      {visible: false, amount: 1},
      {visible: true, amount: 2},
      {visible: false, amount: 1},
      {visible: true, amount: 3},
      {visible: false, amount: 1},
    ];
    const piano = new Piano(whiteKeys, blackKeys);

    piano.keyDown = (keyNumber) => {
      console.log("key down", keyNumber);

      let letterNumber = (keyNumber % 12);
      letterNumber = letterNumber == 0 ? 12 : letterNumber;
      const letter = letterForKey(letterNumber);
      const seconds = 2;
      const section = Math.ceil(keyNumber/12)+2;

      pianoSynth.play(letter, section, seconds);
    }

    document.body.appendChild(piano.HTML);
  }
  function createSmallPiano() {
    const whiteKeys = 14;
    const blackKeys = [
      {visible: false, amount: 1}, 
      {visible: true, amount: 2},
      {visible: false, amount: 1},
      {visible: true, amount: 3},
      {visible: false, amount: 1},
      {visible: true, amount: 2},
      {visible: false, amount: 1},
      {visible: true, amount: 3}
    ];
    const piano = new Piano(whiteKeys, blackKeys);

    piano.keyDown = (keyNumber) => {
      console.log("key down", keyNumber);

      let letterNumber = (keyNumber % 12);
      letterNumber = letterNumber == 0 ? 12 : letterNumber;
      const letter = letterForKey(letterNumber);
      const seconds = 2;
      const section = Math.ceil(keyNumber/12)+3;

      pianoSynth.play(letter, section, seconds);
    }

    document.body.appendChild(piano.HTML);
  }

  function letterForKey(key) {
    switch (key) {
      case 1:
        return "C";
      case 2:
        return "C#";
      case 3:
        return "D";
      case 4:
        return "D#";
      case 5:
        return "E";
      case 6:
        return "F";
      case 7:
        return "F#";
      case 8:
        return "G"
      case 9:
        return "G#";
      case 10:
        return "A";
      case 11:
        return "A#";
      case 12:
        return "B";
    }
  }
});