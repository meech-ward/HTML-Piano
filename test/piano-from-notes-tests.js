const chai = require('chai');
const expect = chai.expect;

const piano = require('../piano/src/piano');

function throwableFunction() {
  const functionThatThrows = arguments[0];
  const otherArguments = Array.from(arguments).slice(1);
  return function() {
    return functionThatThrows.apply(null, otherArguments);
  }
}

function newPianoWithNotes() {
  return throwableFunction.apply(null, [piano.newPianoWithNotes].concat(Array.from(arguments)));
}

describe("piano", function() {
  describe('#newPianoWithNotes', () => {
    context("given undefined", () => {
      it("should throw an error", () => {
        expect(newPianoWithNotes()).to.throw(PianoCreationError);
      });
    });
  });
});