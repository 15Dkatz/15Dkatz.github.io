myApp.controller('NavigationController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$window', '$ionicSideMenuDelegate', '$ionicModal',
  function($scope, $rootScope, Authentication, sharedExercises, $window, $ionicSideMenuDelegate, $ionicModal) {
    // $scope.showAddMenu = false;

    $scope.toggleRight = function() {
        $ionicSideMenuDelegate.toggleLeft();
        console.log("toggling Add Menu");
        // $scope.showAddMenu = true;
    };

}]); // Controller
