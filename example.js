document.addEventListener("DOMContentLoaded", () => {

  
  createPiano(1);
  createPiano(2);

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
    }
    piano.keyUp = (keyNumber) => {
      console.log("key up", keyNumber);
    }
    document.body.appendChild(piano.HTML);
  }

});