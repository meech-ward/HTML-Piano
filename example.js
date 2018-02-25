document.addEventListener("DOMContentLoaded", () => {

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
  piano.keyDown = (keyNumber) => {
    console.log("key down", keyNumber);
  }
  piano.keyUp = (keyNumber) => {
    console.log("key up", keyNumber);
  }
  document.body.appendChild(piano.HTML);

});