# HTML Piano

[![Build Status](https://travis-ci.org/meech-ward/HTML-Piano.svg?branch=master)](https://travis-ci.org/meech-ward/HTML-Piano)

A simple piano made with Vanilla JavaScript. Includes CSS and assets to create a full piano. 

> This is just an interface, it does not play any sound.

## Install

### npm

```terminal
npm install html-piano
```

* You will have to link to the css and JavaScript from your html file:

```html
<link rel="stylesheet" href="node_modules/html-piano/piano/dist/piano.css">
<script src="node_modules/html-piano/piano/dist/piano.js"></script>
```

### Direct Download

* Download this project from https://github.com/meech-ward/HTML-Piano
* Add the `piano/dist` directory to your project
* Link to the css and JavaScript from your html file:

```html
<link rel="stylesheet" href="piano/dist/piano.css">
<script src="piano/dist/piano.js"></script>
```

This will give you a new global function called `newPiano` that you can use to create a new piano.

## Creating a piano

### Node 

If you install this package using node, you will have to require the package with a window object. This should be the browser's window or a mock window.

```js
const htmlPiano = require('html-piano')(window);
const newPiano = htmlPiano.newPiano;
```

### Using notes and octaves data

Create start and end note objects that contain the note and octave to start and end on. No sharps or flats here.

```js
const startNote = {
  note: "c",
  octave: 3
};
const endNote = {
  note: "b",
  octave: 4
};
```

Use those notes to create a new piano and add it to your html.

```js
let piano;
try {
  piano = newPiano(startNote, endNote);
} catch (e) {
  console.log("Error building piano", e);
}

document.body.appendChild(piano.HTML);
```

### Using key layout data

This method allows you to specify the number of white keys that you want to appear, and the layout of the black keys. Starting from left to right, use an object to specify how the black keys will appear in order.

A pretty normal looking piano might look like this.

```js
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
let piano;
try {
  piano = newPiano(whiteKeys, blackKeys);
} catch (e) {
  console.log("Error building piano", e);
}
```

## Responding to events

Once the piano is on the screen, you will want to be able to respond to key down and key up events. These are implemented using a callback function that passes in the key that the event happened on. You can then use the key to request the following data:

* `keyNumber`, the number of the key in relation to all the other keys. This starts at **1** (not 0) on the left and increments as you go to the right.
* `keyNote`, the note of the key played as a lowercase string.
* `keyOctave`, the octave of the key played as a number.

```js
piano.keyDown = (key) => {
  const keyNumber = piano.keyNumber(key);
  const keyNote = piano.keyNote(key);
  const keyOctave = piano.keyOctave(key);

  console.log("key number", keyNumber) 
  console.log("note", keyNote);
  console.log("octave", keyOctave);
}
```

## Musical Typing

This feature is still kind of primitive. You can enable musical typing for `qwerty` keyboards using the following method:

```js
piano.enableMusicalTyping(13);
```

Where 13 is the key to enable typing from.

## Example

Look at the example directory for more information on how to use this.

<https://meech-ward.github.io/HTML-Piano/example/index.html>