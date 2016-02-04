var micApp = angular.module("micApp", []);
micApp.controller("listenController", function($scope) {
	var voice = new Wad({source: 'mic'});
	var tuner = new Wad.Poly();
	tuner.add(voice);

	$scope.userNote="";

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
	$scope.bottomNote = undefined;
	$scope.topNote = undefined;
	$scope.intervalLength = undefined;

	$scope.generateInterval = function() {
		//pick a random number 33-45, or F3 to F4.
		//convert that number into a teoria key or note value.
		//make that note playable (sound) with another function.
		var randKeyNum = Math.floor(Math.random()*12)+33;

		var randKeyTop = randKeyNum+(Math.floor(Math.random()*12));
		
		//debugging
		console.log(randKeyNum, "rkm");

		var noteFromKey = teoria.note.fromKey(randKeyNum);
		$scope.bottomNote = noteFromKey.name().toUpperCase() + noteFromKey.accidental() + noteFromKey.octave();

		var topNoteFromTop = teoria.note.fromKey(randKeyTop);
		$scope.topNote = topNoteFromTop.name().toUpperCase() + topNoteFromTop.accidental() + topNoteFromTop.octave();

		//debugging
		console.log($scope.bottomNote, $scope.topNote, "n->t")
		console.log(teoria.interval.between(noteFromKey, topNoteFromTop).toString(), 'i');

		// $scope.bottomNote = bottomNote;
		$scope.intervalLength=teoria.interval.between(noteFromKey, topNoteFromTop).toString();

	}

	$scope.scoreCount=0;
	// $scope.userNote=$scope.userNote.toUpperCase();

	//need to include note playing.

	$scope.checkAnswer = function() {
		//check if sung topNote = the desired interval.
		//use teoria.js interval method.


		//really check if note letter, and note accidental is the same.


		//taking off ending nums.
		var uNote = $scope.userNote.substr(0, $scope.userNote.length-1);
		var tNote = $scope.topNote.toUpperCase().substr(0, $scope.topNote.length-1);

		console.log(uNote, tNote, "un compares to tn");

		if (teoria.note(uNote).chroma() === teoria.note(tNote).chroma()) {
			$scope.scoreCount++;
		} else {
			//resetting high score Code here.

			console.log("Try again!");
		}

	} 

	var bnSine = new Wad({source: 'sine'});

	$scope.playBottomNote = function() {

		//play battom Note...
		bnSine.play({
			volume: 0.8,
			wait: 0,
			pitch: $scope.bottomNote,
			filter: {frequency: 900}
		})
		console.log("playing", $scope.bottomNote);
	}

	$scope.stopBottomNote = function() {
		//stop bottom Note...
		bnSine.stop($scope.bottomNote);
		console.log("stopping", $scope.bottomNote);
	}


	//use teoria.js to pick a bottomNote from C3-C4.
	//allow user to play note using wad.

	//display the sung/played note.




})



//add Play bottomNote function.
//make this real time.