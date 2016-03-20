myApp.controller('BuildController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$window', '$ionicSideMenuDelegate', '$ionicPopover',
  function($scope, $rootScope, Authentication, sharedExercises, $window, $ionicSideMenuDelegate, $ionicPopover) {
    
    $scope.numOfExercises = 10;
    $scope.timeForExercises = 60;

   
    var randomExercises = [];

    $scope.autoBuild = false;

    // need to popOver and reveal these categories
    var abExercises = ['Crunches', 'Plank', 'Side Plank', 'Crunch Twists', 'Flutter Kicks', 'Bicycle'];
    var cardioExercises = ['Pushups', 'Plank', 'Diamond Pushups', 'Jumping Jacks', 'Wall Sits', 'Lunges', 'Leg Raises', 'Side Plank', 'Side Lunges', 'Tuck Jumps', 'Burpees', 'Squats', 'Calf Raises'];
    var allExercises = ['Crunches', 'Flutter Kicks', 'Pushups', 'Plank', 'Diamond Pushups', 'Jumping Jacks', 'Wall Sits', 'Lunges', 'Leg Raises', 'Crunch Twists', 'Side Plank', 'Side Lunges', 'Tuck Jumps', 'Burpees', 'Squats', 'Calf Raises', 'Bicycle', 'Crunches'];

    
    
    $scope.categories = [
        {
            name: "Abs",
            array: abExercises
        },
        {
            name: "Cardio",
            array: cardioExercises
        }
    ];

    $scope.selectedCategory = $scope.categories[0].array;

    $scope.build = function(numOfExercises, timeForExercises, array) {
        console.log(array);
        // switch(exerciseType) {
        //     case 'abs':
        //         randomExercises = abExercises;
        //         break;
        //     case 'cardio':
        //         randomExercises = cardioExercises;
        //         break;
        //     case 'all':
        //         randomExercises = allExercises;
        //     default:
        //         randomExercises = allExercises;
        // }
        randomExercises = array;

    	var exerciseList = [];

    	for (c=0; c<numOfExercises; c++) {
    		var randEx = randomExercises[Math.floor(Math.random()*randomExercises.length)];
    		var exercise = {
    			'time': timeForExercises,
    			'exercise': randEx
    		}
    		exerciseList.push(exercise);
    	}

        // make workout.js exTime=0;
        var combinedExerciseList = exerciseList.concat(sharedExercises.getExerciseList());

    	sharedExercises.setExerciseList(combinedExerciseList);
        sharedExercises.setExTime(0);


        $rootScope.$broadcast('builtNewSet');

		$window.location.href = '#/tab/workout';
    }

// with only 1 argument, a special array of custom set is set to the sharedExercise.setExerciseList
    // $scope.build = function(customCategory) {

    // }

   //  $scope.popover = $ionicPopover.fromTemplate('popovers/customList.html', {
   //      scope: $scope
   //  }).then(function(popover) {
   //    $scope.popover = popover;
   // });

   // $scope.customCategory = new Array();
   var customCategory = [];
   $scope.customCategory = customCategory;
    
    $scope.openPopover = function($event) {
        $scope.customCategory = {};
        $ionicPopover.fromTemplateUrl('templates/popovers/customList.html', {
            scope: $scope,
            "backdropClickToClose": true
        }).then(function(popover) {
            $scope.popover = popover;
            $scope.popover.show($event);
        });
    };

    $scope.data = {
        shouldShowDelete: false,
    }

    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    // $scope.shouldShowDelete = false;

    $scope.addToCustomCat = function() {
        var newExercise = {
            'time': 0,
            'exercise': "exercise "+(customCategory.length+1),
        };
        customCategory.push(newExercise);
        $scope.customCategory = customCategory;
        console.log(customCategory);
    }

    $scope.removeExercise = function(index) {
        customCategory.splice(index, 1);
        $scope.customCategory = customCategory;
        // sharedExercises.setExerciseList($scope.exerciseList);
        // $scope.updateExerciseList();
        // $scope.exerciseList = $scope.updateExerciseList();
        // timer = false;
        // updateExerciseVariables();
    }


    $scope.setCustomCat = function(categoryName) {

        console.log($scope.customCategory);

        sharedExercises.setExerciseList($scope.customCategory);
        // close Popover
        // and set ShardExercises to the Custom Set
        sharedExercises.setExTime(0);


        $rootScope.$broadcast('builtNewSet');

        $window.location.href = '#/tab/workout';

         $scope.popover.hide();
    }



    // add createCustomSet functionality

}]); // Controller
