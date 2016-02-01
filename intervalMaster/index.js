var context = new AudioContext();
var osc = null;

var notes = {
	"C3": 130.61,
	"C#3": 138.59,
	"D3": 146.83,
	"D#3": 155.56,
	"E3": 164.81,
	"F3": 174.61,
	"F#3": 185,
	"G3": 196,
	"G#3": 207.65,
	"A3": 220,
	"A#3": 233.08,
	"B3": 246.94,
	"C4": 261.63,
	"C#4": 277.18,
	"D4": 293.66,
	"D#4": 311.13,
	"E4": 329.63,
	"F4": 349.23,
	"F#4": 369.99,
	"G4": 392,
	"G#4": 415.3,
	"A4": 440.16,
	"A#4": 466.16,
	"B4": 493.88,
	"C5": 525.25,
	"C#5": 554.37,
	"D5": 587.33,
	"D#5": 622.25,
	"E5": 659.32,
	"F5": 698.46,
	"F#5": 739.99,
	"G5": 783.99,
	"G#5": 830.61,
	"A#5": 932.33,
	"A5": 880,
	"A#5": 932.33,
	"B5": 987.77,
	"C6": 1046.5
}

//scales Differ SO CHANGE - intervalTop - intervalBottom doesn't necessarily yield...
var notesArray = new Array("C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6");

//intervalArray
var intervalsArray = new Array("m2", "M2", "m3", "M3", "P4", "A4", "P5", "m6", "M6", "m7", "M7", "P8");

//if topNote - bottomNote = position in interalArray then increment.

function startOsc(note) {
	// var attack = 10,
	// 	decay = 250,
	// 	gain = context.createGain();
	osc=context.createOscillator();
	//make the note sound more piano-like with an attack and a decay.
	// gain.connect(context.destination);
	// gain.gain.setValueAtTime(0, context.currentTime);
	// gain.gain.linearRampToValueAtTime(1, context.currentTime + attack/1000);
	// gain.gain.linearRampToValueAtTime(0, context.currentTime + decay/1000);
	osc.frequency.value = notes[note];
	osc.connect(context.destination);
	
	// if (notes[note]=="C3") {
	// 	osc.gain.value=50;
	// }	
	osc.start(0);
	// osc.connect(gain);
	//prevent from hitting twice.
}

function stopOsc() {
	osc.stop();
	osc.disconnect(context.destination);
	osc = null;
}

var playedItv = null;
$(document).ready(function() {
	$(".start")
	.mousedown(function() {
		var note = $(this).attr("note");
		startOsc(note);
	})
	.mouseup(function() {
		stopOsc();
	});
	$(".s1").hover(function() {
		playedItv = $(this).attr("interval");
	})
});


$(document).ready(function () {
	$('#fullpage').fullpage({
		controlArrows: true
	})
});


angular.module("ScoreApp", [])
	.controller("ScoreController", function($scope) {
		$scope.counter = 0;
		$scope.highscore=$scope.counter;

		var intervalBottom = null;
		var intervalTop = null;

		var preventAfterCheck = false;

		var randItv = function () {
			intervalBottom = Math.floor((Math.random()*24)+1);;
			intervalTop = Math.floor(intervalBottom+(Math.random()*12)+1);
		}
		randItv();
		var intervalLen = null;

		$scope.ascDesSetting = "ascending";
		$scope.melHarSetting = "melodic";

		$scope.toggleAscDes = function() {
			if ($scope.ascDesSetting === "ascending") {
				$scope.ascDesSetting = "descending";
				document.getElementById("ascDesSetting").style.background = "#81c784";
			} else if ($scope.ascDesSetting === "descending") {
				$scope.ascDesSetting = "both";
				document.getElementById("ascDesSetting").style.background = "#66bb6a";
			} else {
				$scope.ascDesSetting = "ascending";
				document.getElementById("ascDesSetting").style.background = "#a5d6a7";
			}	
		}

		$scope.toggleMelHar = function() {
			if ($scope.melHarSetting === "melodic") {
				$scope.melHarSetting = "harmonic";
				document.getElementById("melHarSetting").style.background = "#81c784";
			} else if ($scope.melHarSetting === "harmonic") {
				$scope.melHarSetting = "both";
				document.getElementById("melHarSetting").style.background = "#66bb6a";
			} else {
				$scope.melHarSetting = "melodic";
				document.getElementById("melHarSetting").style.background = "#a5d6a7";
			}	
		}


		var bottomNote = null;
		var topNote = null;

		var cont = new AudioContext();

		$scope.playInterval = function() {
			preventAfterCheck = false;
			function notePlay(note) {
				var osci = cont.createOscillator();
				osci.connect(cont.destination);
				osci.frequency.value=notes[note];


				//implement attack and decay for smoother sound.
				osci.start(0);
				// startOsc(note);
				console.log(note);
				setTimeout(function() {
					osci.stop();
					osci.disconnect(cont.destination);
				}, 1000/1.33);
			}
			var interval = new Array(notesArray[intervalBottom], notesArray[intervalTop]);

			console.log(intervalTop + " top     bottom " + intervalBottom);
			intervalLen = intervalTop-intervalBottom-1;
			console.log(intervalLen + " itvLen");
			var melHarTime = 900;

			if ($scope.melHarSetting === "harmonic") {
				melHarTime = 0;
			} else if ($scope.melHarTime === "both") {
				var randTime = Math.random()*10;
				if (randTime < 5) {
					melHarTime = 900;
				} else {
					melHarTime = 0;
				}
			}

			if ($scope.ascDesSetting === "ascending") {
				setTimeout(function(){notePlay(interval[0])}, 0);
				setTimeout(function(){notePlay(interval[1])}, melHarTime);
				bottomNote = interval[0];
				topNote = interval[1];
			} else if ($scope.ascDesSetting === "descending") {
				setTimeout(function(){notePlay(interval[1])}, 0);
				setTimeout(function(){notePlay(interval[0])}, melHarTime);
				bottomNote = interval[1];
				topNote = interval[0];
			} else {
				var randOrd = Math.random()*10;
				if (randOrd<5) {
					setTimeout(function(){notePlay(interval[0])}, 0);
					setTimeout(function(){notePlay(interval[1])}, melHarTime);					
					bottomNote = interval[0];
					topNote = interval[1];				
				} else {
					setTimeout(function(){notePlay(interval[1])}, 0);
					setTimeout(function(){notePlay(interval[0])}, melHarTime);				
					bottomNote = interval[1];
					topNote = interval[0];

				}
			}
		}

		$scope.customStyle = {};
		$scope.turnGreen = function() {
			$scope.customStyle.colorClass = "green";
		}

		$scope.turnRed = function() {
			$scope.customStyle.colorClass = "red";
		}

		$scope.checkAnswer = function() {
			// var preventAfterCheck = true;
			var checkItv = intervalsArray[intervalLen];
			console.log(checkItv + "    " + playedItv);

			if (preventAfterCheck === false) {
				if (checkItv === playedItv) {
					preventAfterCheck = true;
					console.log(preventAfterCheck);
					$scope.counter++;
					if ($scope.counter>$scope.highscore) {
						$scope.highscore=$scope.counter;
					}
					document.getElementById("customColor").style.color = "#a5d6a7";
					$scope.evaluation = "done";
				} else {
					$scope.counter = 0;
					document.getElementById("customColor").style.color = "#e77777";
					$scope.evaluation = "warning";
					preventAfterCheck = true;
				}
			}
			randItv();
			$scope.expected = checkItv;
			$scope.bottomNote = bottomNote + " -> ";
			$scope.topNote = topNote + " = ";
		}


})