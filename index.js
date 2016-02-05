var micApp = angular.module("micApp", []);
micApp.controller("listenController", function($scope) {
	var voice = new Wad({source: 'mic'});
	var tuner = new Wad.Poly();
	tuner.add(voice);

	$scope.userNote="...";

	// var kill=false;

	$scope.listen = function() {
		// if (!kill===true) {
		voice.play();
		tuner.updatePitch();

		var logPitch = function(){

			$scope.userNote=tuner.noteName;

			console.log($scope.userNote, "userNote");

			console.log(tuner.pitch, tuner.noteName);
			// requestAnimationFrame(logPitch);
		};
		// tuner.stopUpdatingPitch();
		logPitch();
		// }
	}

	$scope.stopListen = function() {
		// tuner.stopUpdatingPitch();
		// stop = 0;
		// kill=true;
		tuner.stop();
		voice.stop();
		tuner.stopUpdatingPitch();
	}



	// var noteNames = ['f3', 'f']
	$scope.bottomNote = "...";
	$scope.topNote = "...";
	$scope.intervalLength = "...";

	var bottomNoteFQ = "...";

	$scope.giButtonDisplay = "Begin";

	$scope.generateInterval = function() {
		$scope.giButtonDisplay = "Next";
		//pick a random number 33-45, or F3 to F4.
		//convert that number into a teoria key or note value.
		//make that note playable (sound) with another function.
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

		// $scope.bottomNote = bottomNote;
		$scope.intervalLength=teoria.interval.between(noteFromKey, topNoteFromTop).toString();

	}

	$scope.scoreCount=0;
	// $scope.userNote=$scope.userNote.toUpperCase();

	$scope.total=0;

	$scope.checkAnswer = function() {
		var uNote = $scope.userNote;
		var tNote = $scope.topNote.toUpperCase();

		console.log(uNote, tNote, "un compares to tn");

		if (teoria.note(uNote).chroma() === teoria.note(tNote).chroma()) {
			$scope.scoreCount++;
		} else {
			//resetting high score Code here.
			$scope.scoreCount=0;
			console.log("Try again!");
		}
		$scope.total++;
		$scope.generateInterval();
	} 

	var bnSine = new Wad({source: 'sine'});

	$scope.playBottomNote = function() {

		//play battom Note...
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
		//stop bottom Note...
		bnSine.stop(bottomNoteFQ);
		console.log("stopping", $scope.bottomNote);
	}


	//use teoria.js to pick a bottomNote from C3-C4.
	//allow user to play note using wad.

	//display the sung/played note.




})


//check bugs.


//add Play bottomNote function.
//make this real time.