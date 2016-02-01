//encompass this within a function to create new randomly generated numbers...
//scales with double sharps or double flats: eb4 minor, a#4 major, f#4 minor


//figure out double sharps and double flats..
//push the rest later..
var scales = ["major", "minor", "dorian", "phrygian", "lydian", "mixolydian", "locrian"]

//decide betweeen minor, major, ly dian, mixolydian, etc. at the beginning of program.
//Auto-generate random. Later change 2 to length of scales in order to achieve full randomness.
var randScale = (Math.floor(Math.random()*(scales.length)));
var scale = scales[randScale];
//uncomment above for proper performance
// var scale = scales[];
console.log(scale + " scale");  

//later extend

//how to decide between major or minor...?
//to change c#4 to db4, add 1 to the index, and insert a b in between for selecting keys.
var notes = ["c4", "d4", "e4", "f4", "g4", "a4", "b4"];
var randNote = (Math.floor(Math.random()*7));
var note = notes[randNote];
////uncomment above for proper performance
// var note = 'b4'

//1/2 chance.
//for enharmonics if #4's included.
// var coinFlip = Math.floor(Math.random()*2)
// var switchHarmonic = false;
// if (coinFlip>0) {
//   switchHarmonic = true;
// } 

// console.log(randNote + "   randNote");
// //and randNote === 1, 3, 6, 8, 10 i.e. the sharped positions...
// //i.e. convert 'c#4' to 'db4'
// if ((switchHarmonic)&&((randNote===1)||(randNote===3)||(randNote===6)||(randNote===8)||(randNote===10)))   {
//   note=notes[randNote+1].replace('4', 'b4');
//   console.log("switch!");
// }

var teoriaScale = teoria.note(note).scale(scale);

var exString = "";
for (var i=0; i<7; i++) {
  // console.log(teoriaScale.notes()[i].key() + "  ");  
  exString += teoriaScale.notes()[i].key() + " ";
}

var canvas = $("div.examplea canvas")[0];
var renderer = new Vex.Flow.Renderer(canvas, 
  Vex.Flow.Renderer.Backends.CANVAS);

var ctx = renderer.getContext();
var stave = new Vex.Flow.Stave(10, 0, 500);
stave.addClef("treble").setContext(ctx).draw();

var keyNotePairs = {
  // 40: "c/4",
  // 41: "c/4",
  // 42: "d/4",
  // 43: "d/4",
  // 44: "e/4",
  // 45: "f/4",
  // 46: "f/4",
  // 47: "g/4",
  // 48: "g/4",
  // 49: "a/4",
  // 50: "a/4", 
  // 51: "b/4",
  // 52: "c/5",
  // 53: "c/5",
  // 54: "d/5",
  // 55: "d/5",
  // 56: "e/5",
  // 57: "f/5",
  // 58: "f/5",
  // 59: "g/5",
  // 60: "g/5",
  // 61: "a/5",
  // 62: "a/5", 
  // 63: "b/5",
  // 64: "c/6",

  40: "c/4",
  41: "acc",
  42: "d/4",
  43: "acc",
  44: "e/4",
  45: "f/4",
  46: "acc",
  47: "g/4",
  48: "acc",
  49: "a/4",
  50: "acc", 
  51: "b/4",
  52: "c/5",
  53: "acc",
  54: "d/5",
  55: "acc",
  56: "e/5",
  57: "f/5",
  58: "acc",
  59: "g/5",
  60: "acc",
  61: "a/5",
  62: "acc", 
  63: "b/5",
  64: "c/6",
}


//needs to start on different keys.

var scaleAccidentals = {
  //add major, melodic, harmonic, minor, etc.
  "major": ["s", 0, 0, 0, 0, 0, 0, 0],
  "minor": ["b", 0, 0, 3, 0, 0, 6, 7]
}


//instance that b4 major gets selected,
//program must understand to place sharps in specific section.


//add accidentals because of lydian scale...

// for the length of the scale add the keyNotePair, and add the proper accidental
// add accidentals according to the scale

// var accidentalVal = {
//   'b': -1;
//   '#': 1;
// }


var notes = [
  // new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q"}),
  // new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q"}),
  // new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q"}).
  //   addAccidental(0, new Vex.Flow.Accidental("b")),
  // new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q"}),
  // new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q"}),
  // new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q"}).
  //   addAccidental(0, new Vex.Flow.Accidental("b")),
  // new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "q"}).
  //   addAccidental(0, new Vex.Flow.Accidental("b")),
  // new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "q"})
]

// notes.push("c/4");
// console.log(teoriaScale.notes().length);
var accidentalToAdd = '#';

// if (scale==)

for (var i=0; i<teoriaScale.notes().length; i++) {
  // keyNotePairs[teoriaScale.notes()[i].key()
  //the +1 solves the problems of flats vs sharps using the same note.
  // if ((scaleAccidentals[scale][0]==="b")&&(scaleAccidentals[scale][i+1]>0)) {
  //   notes.push(new Vex.Flow.StaveNote({ keys: [keyNotePairs[teoriaScale.notes()[i].key()+1]], duration: 'q'}).
  //     addAccidental(0, new Vex.Flow.Accidental("b")))


  //minor scales broken, fmajor broken, clean *********TO DO ********

  var teokey = teoriaScale.notes()[i].key();
  if (((note[0]==='g')||(note[0]==='c')||(note[0]==='d')||(note[0]==='f'))
    &&((scale==='minor')||(scale==='locrian')||(scale==='dorian')||(scale==='phrygian'))) {
    accidentalToAdd = 'b';
  }

  if ((((note[0]==='a'||note[0]==='e')&&(scale==='phrygian'||scale==='locrian'))||(((note[0]==='f')||(note[0]==='c'))&&(scale==='mixolydian')))||note[0]==='f') {
    accidentalToAdd = 'b';
  }

  console.log(teokey + "   " + i + "  teokey");
  //check for accidentals
  if ((note[0]==='f')&&(scale==='locrian')&&(i===4)) {
    notes.push(new Vex.Flow.StaveNote({ keys: [keyNotePairs[52]], duration: 'q'}).
        addAccidental(0, new Vex.Flow.Accidental(accidentalToAdd)));
  } else if ((note[0]==='b')&&(scale==='lydian')&&(i===3)) {
    notes.push(new Vex.Flow.StaveNote({ keys: [keyNotePairs[56]], duration: 'q'}).
        addAccidental(0, new Vex.Flow.Accidental(accidentalToAdd)));
  } else if (keyNotePairs[teokey]!="acc") {
    // if (keyNotePairs[teokey][0]!=keyNotePairs[teoriaScale.notes()[i-1].key()][0]) {
    // if ((note[1]==='b')&&(teokey===52)) {
    //   notes.push(new Vex.Flow.StaveNote({ keys: [keyNotePairs[teokey-1]], duration: 'q'}))
    // } else {
    notes.push(new Vex.Flow.StaveNote({ keys: [keyNotePairs[teokey]], duration: 'q'}))
    // }
    // notes.push(new Vex.Flow.StaveNote({ keys: [keyNotePairs[teokey]], duration: 'q'}))
    // } else {
    //   notes.push(new Vex.Flow.StaveNote({ keys: [keyNotePairs[teokey+1]], duration: 'q'}))
    // };

  } else {
//need to take double flats into consideration. look at g4 minor.
    if (accidentalToAdd==='b') {
      notes.push(new Vex.Flow.StaveNote({ keys: [keyNotePairs[teokey+1]], duration: 'q'}).
        addAccidental(0, new Vex.Flow.Accidental(accidentalToAdd)));
    } else {
      notes.push(new Vex.Flow.StaveNote({ keys: [keyNotePairs[teokey-1]], duration: 'q'}).
        addAccidental(0, new Vex.Flow.Accidental(accidentalToAdd)));
    }
  }
  
}

//the octave up.
var octaveKey = teoriaScale.notes()[0].key()+12;
if (keyNotePairs[octaveKey]!="acc") {
  notes.push(new Vex.Flow.StaveNote({keys: [keyNotePairs[octaveKey]], duration: 'q'}));
} else {
  notes.push(new Vex.Flow.StaveNote({keys: [keyNotePairs[octaveKey-1]], duration: 'q'}).
    addAccidental(0, new Vex.Flow.Accidental(accidentalToAdd)));
}


//almost there...


var voice = new Vex.Flow.Voice({
  num_beats: 8,
  beat_value: 4, //quarter note
  resolution: Vex.Flow.RESOLUTION
})


voice.addTickables(notes);

var formatter = new Vex.Flow.Formatter().
  joinVoices([voice]).format([voice], 500);

voice.draw(ctx, stave);


angular.module("musicWithUsApp", [])
  .controller("musicWithUsController", function($scope) {
    $scope.exStringA = exString;


    $scope.scale = note + " " + scale;
})

  // 40 42 43 45 47 48 50, 52
  // C4, D4, Eb4, F4, G4, Ab4, Bb4, C5

//javascript speech-recognition api
// var recognition = new webkitSpeechRecognition()


