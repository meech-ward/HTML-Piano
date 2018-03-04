# Piano

A simple piano made with Vanilla JavaScript.

Use the code in the `piano/dist` directory

## Creating a piano

Include the `piano` folder in your project and link to the css and JavaScript:

```html
<link rel="stylesheet" href="piano/dist/piano.css">
<script src="piano/dist/piano.js"></script>
```

**Using notes and octaves data**

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
  if (e instanceof PianoBuildError) {
    console.log("Error building piano", e);
  } else {
    throw e;
  }
}

document.body.appendChild(piano.HTML);
```

## Responding to events

Once the piano is on the screen, you will want to be able to respond to key down and key up events. These are implemented using a callback function that passes in the key that the event happend on. You can then use the key to request the following data:

* `keyNumber`, the number of the key in relation to all the other keys. This starts at 1 on the left and increments as you go to the right.
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

## Example

Look at the example directory for more information on how to use this.

<https://meech-ward.github.io/HTML-Piano-VanillaJS/example/index.html>