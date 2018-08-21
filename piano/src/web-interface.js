"use strict";

const pianoDOM = require('../piano-DOM')(document || window.document);
const { newPiano } = require('./piano')(pianoDOM);

window.newPiano = newPiano;
window.PianoBuildError = require('./piano-build-error');