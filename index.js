var micApp = angular.module("micApp", []);
micApp.controller("listenController", function($scope) {
	var voice = new Wad({source: 'mic'});
	var tuner = new Wad.Poly();
	tuner.add(voice);

	$scope.listen = function() {
		voice.play();

		tuner.updatePitch();
		var logPitch = function(){
			console.log(tuner.pitch, tuner.noteName)
			requestAnimationFrame(logPitch)
		};

		logPitch();
	}

	$scope.stopListen = function() {
		tuner.stopUpdatingPitch;
	}

})