var musicWithUsApp = angular.module("musicWithUsApp", [])
  .controller("musicWithUsController", function($scope) {
    //encompass this within a function to create new randomly generated numbers...
    //scales with double sharps or double flats: eb4 minor, a#4 major, f#4 minor
    var scales = ["major", "minor", "dorian", "phrygian", "lydian", "mixolydian", "locrian"];
    var scale = scales[0];

    var notesBase = ["c4", "d4", "e4", "f4", "g4", "a4", "b4"];
    var note = notesBase[0];

    var exString = ""; 

    //include all eventually [append to scales];
    // majorpentatonic 
    // minorpentatonic 
    // chromatic
    // harmonicchromatic (Alias for chromatic)
    // blues
    // doubleharmonic
    // flamenco
    // harmonicminor - broken? "Invalid scale - check api."
    // melodicminor
    // wholetone
    $scope.beginButton = "Begin";

    $scope.generateScale = function() {
      var scales = ["major", "minor", "dorian", "phrygian", "lydian", "mixolydian", "locrian"];
      var randScale = (Math.floor(Math.random()*(scales.length)));
      scale = scales[randScale];
      //for debugging: uncomment below, comment out above, and input a number.
      // scale = scales[0];
      // console.log(scale + " scale");  
      var notesBase = ["c4", "d4", "e4", "f4", "g4", "a4", "b4"];
      var randNote = (Math.floor(Math.random()*notesBase.length));
      note = notesBase[randNote];

      //enharmonic section
      var teoriaScale = teoria.note(note).scale(scale);

      for (var i=0; i<7; i++) {
        // console.log(teoriaScale.notes()[i].key() + "  ");  
        exString += teoriaScale.notes()[i].key() + " ";
      }

      var canvas = $("div.canvasa canvas")[0];
      var renderer = new Vex.Flow.Renderer(canvas, 
        Vex.Flow.Renderer.Backends.CANVAS);

      var ctx = renderer.getContext();
      ctx.clear();
      var stave = new Vex.Flow.Stave(10, 0, 500);
      stave.addClef("treble").setContext(ctx).draw();

      var keyNotePairs = {
        //Put on single line.
        40: "c/4", 41: "acc", 42: "d/4", 43: "acc", 44: "e/4",  45: "f/4",  46: "acc",  47: "g/4", 48: "acc", 49: "a/4",  50: "acc",  51: "b/4", 52: "c/5", 53: "acc", 54: "d/5",55: "acc",  56: "e/5",  57: "f/5",  58: "acc",59: "g/5",  60: "acc",  61: "a/5",  62: "acc",   63: "b/5", 64: "c/6",
      }

      var notes = [];

      var accidentalToAdd = '#';

      for (var i=0; i<teoriaScale.notes().length; i++) {
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
          notes.push(new Vex.Flow.StaveNote({ keys: [keyNotePairs[teokey]], duration: 'q'}));
        } else {
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

      var voice = new Vex.Flow.Voice({
        num_beats: 8,
        beat_value: 4, //quarter note
        resolution: Vex.Flow.RESOLUTION
      })

      voice.addTickables(notes);
      var formatter = new Vex.Flow.Formatter().
        joinVoices([voice]).format([voice], 500);
      voice.draw(ctx, stave);

      console.log(note + "  " + scale);
      
      if ($scope.beginButton === "Begin") {
        $scope.beginButton = "Next";
      }
    }

    $scope.generateScale();

    $scope.scaleButtons = [
      {"name": "major"}, 
      {"name": "minor"},
      {"name": "dorian"},
      {"name": "phrygian"},
      {"name": "lydian"},
      {"name": "mixolydian"},
      {"name": "locrian"}
    ];

    $scope.currentScore=0;
    $scope.total=0;
    $scope.highScore=0;

    $scope.checkAnswer = function(name) {
      if (name===scale) {
        $scope.currentScore++;
      } else {
        $scope.currentScore=0;
        $scope.total=-1; 
      }
      if ($scope.currentScore>$scope.highScore) {
        $scope.highScore=$scope.currentScore;
      }

      $scope.total++;
    };

})

//javascript speech-recognition api
// var recognition = new webkitSpeechRecognition()


