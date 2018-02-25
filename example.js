document.addEventListener("DOMContentLoaded", () => {

  
  createPiano(1);
  createPiano(2);

  let pianoSynth = Synth.createInstrument('piano');

  function createPiano(number) {
    const whiteKeys = 16;
    const blackKeys = [
      {visible: false, amount: 2}, 
      {visible: true, amount: 3},
      {visible: false, amount: 1},
      {visible: true, amount: 2},
      {visible: false, amount: 1},
      {visible: true, amount: 3},
      {visible: false, amount: 1},
      {visible: true, amount: 2}
    ];
    const piano = new Piano(whiteKeys, blackKeys);
    piano.number = number;
    piano.keyDown = (keyNumber) => {
      console.log("key down", keyNumber);
      const sound = soundForKeyNumber(keyNumber);
      const seconds = 2;
      pianoSynth.play(sound.note, sound.section, seconds);
    }
    piano.keyUp = (keyNumber) => {
      console.log("key up", keyNumber);
    }
    document.body.appendChild(piano.HTML);


    function soundForKeyNumber(keyNumber) {
      switch (keyNumber) {
        case 0:
          return {note: "D#", section: 3};
        case 1:
          return {note: "E", section: 3};
        case 2:
          return {note: "F", section: 3};
        case 3:
          return {note: "F#", section: 3};
        case 4:
          return {note: "G", section: 3};
        case 5:
          return {note: "G#", section: 3};
        case 6:
          return {note: "A", section: 3};
        case 7:
          return {note: "A#", section: 3};
        case 8:
          return {note: "B", section: 3};
        case 9:
          return {note: "C", section: 4};
        case 10:
          return {note: "C#", section: 4};
        case 11:
          return {note: "D", section: 4};
        case 12:
          return {note: "D#", section: 4};
        case 13:
          return {note: "E", section: 4};
        case 14:
          return {note: "F", section: 4};
        case 15:
          return {note: "F#", section: 4};
        case 16:
          return {note: "G", section: 4};
        case 17:
          return {note: "G#", section: 4};
        case 18:
          return {note: "A", section: 4};
        case 19:
          return {note: "A#", section: 4};
        case 20:
          return {note: "B", section: 4};
        case 21:
          return {note: "C", section: 5};
        case 22:
          return {note: "C#", section: 5};
        case 23:
          return {note: "D", section: 5};
        case 24:
          return {note: "D#", section: 5};
        case 25:
          return {note: "E", section: 5};
        case 26:
          return {note: "F", section: 5};
        case 27:
          return {note: "F#", section: 5};
        case 28:
          return {note: "G", section: 5};
        case 29:
          return {note: "G#", section: 5};
        case 30:
          return {note: "A", section: 5};
        case 31:
          return {note: "A#", section: 5};
        case 32:
          return {note: "B", section: 5};
        default:
          return {note: "C", section: 1};
      }

    }
  }

});