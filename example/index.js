document.addEventListener("DOMContentLoaded", () => {

  createBigPiano();
  createSmallPiano();

  let pianoSynth = Synth.createInstrument('piano');

  function createBigPiano() {
    // Using underlying white / black key layout data
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
    const piano = newPiano(whiteKeys, blackKeys);
    
    // Musical Typing
    let currentMusicalTypingIndex = 13;
    

    function updateMusicalTypingPlacement() {
      piano.disableMusicalTyping();
      piano.enableMusicalTyping(currentMusicalTypingIndex);
    }
    updateMusicalTypingPlacement();
    
    document.addEventListener("keydown", function(event) {
      console.log(event.key, piano.totalKeys);
      if (event.key === "ArrowLeft" && currentMusicalTypingIndex > 1) {
        currentMusicalTypingIndex--;
        updateMusicalTypingPlacement();
        console.log(piano.musicalTypingKeyForLetter('a').classList);
        // if (!piano.musicalTypingKeyForLetter('a').classList.contains('white-key')) {
        //   console.log("not currently white");
        //   currentMusicalTypingIndex--;
        //   updateMusicalTypingPlacement();
        // }
        
      } else if (event.key === "ArrowRight" && currentMusicalTypingIndex < piano.totalKeys-11) {
        currentMusicalTypingIndex++;
        updateMusicalTypingPlacement();
        // if (!piano.musicalTypingKeyForLetter('a').classList.contains('white-key')) {
        //   currentMusicalTypingIndex++;
        //   updateMusicalTypingPlacement();
        // }
      }
      
    });

    // piano.disableMusicalTyping();
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
    window.piano1 = piano;
  }
  function createSmallPiano() {
    // Using notes and octaves data
    const startNote = {
      note: "c",
      octave: 3
    };
    const endNote = {
      note: "b",
      octave: 4
    };

    let piano;
    try {
      piano = newPiano(startNote, endNote);
    } catch (e) {
      if (e instanceof PianoBuildError) {
        console.log("Error building piano", e);
      } else {
        throw e;
      }
    } 

    piano.keyDown = (key) => {
      const keyNumber = piano.keyNumber(key);
      const keyNote = piano.keyNote(key);
      const keyOctave = piano.keyOctave(key);

      console.log("key number", keyNumber) 
      console.log("note", keyNote);
      console.log("octave", keyOctave);

      let letterNumber = (keyNumber % 12);
      letterNumber = letterNumber == 0 ? 12 : letterNumber;
      const letter = letterForKey(letterNumber);
      const seconds = 2;
      const section = Math.ceil(keyNumber/12)+3;

      pianoSynth.play(letter, section, seconds);
    }

    document.body.appendChild(piano.HTML);
    window.piano2 = piano;
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