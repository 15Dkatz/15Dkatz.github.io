<<<<<<< HEAD
$(document).ready(function() {
    $('#fullpage').fullpage();
});
=======
var micApp = angular.module("micApp", []);
micApp.controller("listenController", function($scope) {
	var voice = new Wad({source: 'mic'});
	var tuner = new Wad.Poly();
	tuner.add(voice);

	$scope.userNote="...";


	$scope.listen = function() {
		voice.play({volume: 0.6});
		tuner.updatePitch();

		var logPitch = function(){
			$scope.userNote=tuner.noteName.substr(0, tuner.noteName.length-1);
			console.log($scope.userNote, "userNote");
			console.log(tuner.pitch, tuner.noteName);
		};
		logPitch();
	}

	$scope.stopListen = function() {
		tuner.stop();
		voice.stop();
		tuner.stopUpdatingPitch();
	}

	$scope.bottomNote = "...";
	$scope.topNote = "...";
	$scope.intervalLength = "...";

	var bottomNoteFQ = "...";

	$scope.giButtonDisplay = "Begin";

	$scope.generateInterval = function() {
		$scope.giButtonDisplay = "Next";
		var randKeyNum = Math.floor(Math.random()*12)+33;
		var randKeyTop = randKeyNum+(Math.floor(Math.random()*12));
		
		//debugging
		console.log(randKeyNum, "rkm");

		var noteFromKey = teoria.note.fromKey(randKeyNum);
		bottomNoteFQ=noteFromKey.fq();
		// noteFromKey.octave() for octave specification if needed.
		$scope.bottomNote = noteFromKey.name().toUpperCase() + noteFromKey.accidental();

		var topNoteFromTop = teoria.note.fromKey(randKeyTop);
		$scope.topNote = topNoteFromTop.name().toUpperCase() + topNoteFromTop.accidental();
		//debugging
		console.log($scope.bottomNote, $scope.topNote, "n->t")
		console.log(teoria.interval.between(noteFromKey, topNoteFromTop).toString(), 'i');

		$scope.intervalLength=teoria.interval.between(noteFromKey, topNoteFromTop).toString();

	}

	$scope.scoreCount=0;
	$scope.total=0;

	$scope.checkAnswer = function() {
		var uNote = $scope.userNote;
		var tNote = $scope.topNote.toUpperCase();

		console.log(uNote, tNote, "un compares to tn");

		if (teoria.note(uNote).chroma() === teoria.note(tNote).chroma()) {
			$scope.scoreCount++;
		} else {
			$scope.scoreCount=0;
			console.log("Try again!");
		}
		$scope.total++;
		$scope.generateInterval();
	} 

	var bnSine = new Wad({source: 'sine'});

	$scope.playBottomNote = function() {
		bnSine.play({
			volume: 0.8,
			wait: 0,
			pitch: bottomNoteFQ,
			env: {
				attack: 0.0,
				decay: 0.5,
				sustain: 0.25,
				hold: 0.25,
			},
			filter: {frequency: 900}
		})
		console.log("playing", $scope.bottomNote);
		console.log("bottomNote fq = ", bottomNoteFQ);
	}

	$scope.stopBottomNote = function() {
		bnSine.stop(bottomNoteFQ);
		console.log("stopping", $scope.bottomNote);
	}
})


//Improvements:
//Add a check mark, or an 'x' mark depending on whether or not the user sings and checks the correct note.
//Add a descending option, where the user has to sing the bottom note of an interval, and the app gives the top note.
//real time capability perhaps, similar to a guitar tuner, where it check for a correct answer depending if a certain note gets hold for a certain amount of time.
>>>>>>> 2e7ace2bb579c332b7b1434ca35b84a9361261e6
