angular.module('starter.controllers', [])


myApp.controller('AccountController', ['$scope', 'Authentication', 'sharedExercises', '$firebaseAuth', 'FIREBASE_URL', '$ionicPopup', '$timeout', 
  function($scope, Authentication, sharedExercises, $firebaseAuth, FIREBASE_URL, $ionicPopup, $timeout) {
  $scope.firstname;
  $scope.lastname;

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  // $scope.showLoginContent = true;  
  auth.$onAuth(function(authUser) {
    if (authUser) {
      $scope.firstname = sharedExercises.getFirstname();
      $scope.lastname = sharedExercises.getLastname();

      console.log("firstname", $scope.firstname, "lastname", $scope.lastname);
    }
  })


  $scope.logout = function() {
    Authentication.logout();
  }; //logout

  $scope.login = function(email, password) {
      console.log(email);
      var user = {
        'email': email,
        'password': password
      }
      Authentication.login(user);
      // $scope.showLoginContent = false;
  }; //login

  $scope.saveAccountChanges = function(newFirstname, newLastname, newEmail) {
    sharedExercises.updateAccountFirstname(newFirstname);
    sharedExercises.updateAccountLastname(newLastname);
    sharedExercises.updateAccountEmail(newEmail);
  };

  // $scope.changeEmail = function(newEmail, password) {
  //   // console.log("attempting email change", "password:", password, "password.type:", typeof password);
  //   Authentication.changeEmail(newEmail);
  // }

  $scope.updateFirstname = function(newFirstname) {
    if (newFirstname) {
      sharedExercises.updateAccountFirstname(newFirstname);
      $scope.firstname = newFirstname;
    }
    
  };

  $scope.updateLastname = function(newLastname) {
    if (newLastname) {
      sharedExercises.updateAccountLastname(newLastname);
      $scope.lastname = newLastname; 
    }
  };

  // add last Name function...
  $scope.updateEmail = function(oldEmail, newEmail, currentPassword) {
    $scope.newUserSettings = {};
    var myPopup = $ionicPopup.show({
        templateUrl: "templates/popups/changeEmail.html",
        title: 'Confirm Email Change',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Submit</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newUserSettings) {
                e.preventDefault();
              } else {
                Authentication.changeEmail($scope.newUserSettings.oldEmail, $scope.newUserSettings.newEmail, $scope.newUserSettings.currentPassword);
              }
            }
          }
         ]
        });

        myPopup.then(function(res) {
          console.log('Tapped!', res);
        });

        $timeout(function() {
           myPopup.close(); 
        }, 1200000);

  };

  $scope.updatePassword = function() {
    $scope.newUserSettings = {};
    var myPopup = $ionicPopup.show({
        templateUrl: "templates/popups/changePassword.html",
        title: 'Confirm Password Change',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Submit</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newUserSettings) {
                e.preventDefault();
              } else {
                Authentication.changePassword($scope.newUserSettings.email, $scope.newUserSettings.oldPassword, $scope.newUserSettings.newPassword);
              }
            }
          }
         ]
        });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });

    $timeout(function() {
       myPopup.close(); 
    }, 1200000);
  };
  


// Sending Password Reset Emails

// You can send the user a password reset email using the email address for that account:

// Copy
// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
// ref.resetPassword({
//   email : "bobtony@firebase.com"
// }, function(error) {
//   if (error === null) {
//     console.log("Password reset email sent successfully");
//   } else {
//     console.log("Error sending password reset email:", error);
//   }
// }); 
  $scope.test = function() {
    console.log("attempting password reset");
  };

  $scope.resetPassword = function() {
      console.log("attempting password reset");
      $scope.newUserSettings = {};
      var myPopup = $ionicPopup.show({
          templateUrl: "templates/popups/resetPassword.html",
          title: 'Your email',
          // subtilte: '',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Submit</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.newUserSettings) {
                  e.preventDefault();
                } else {
                  Authentication.resetPassword($scope.newUserSettings.email);
                }
              }
            }
           ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

          $timeout(function() {
             myPopup.close(); 
          }, 1200000);
    }; 

  // }

}])

// myApp.controller('LoginController', ['$scope', 'Authentication', function($scope, Authentication) {
//     $scope.login = function(email, password) {
//       console.log(email);
//       var user = {
//         'email': email,
//         'password': password
//       }
//       Authentication.login(user);
//   }; //login
// }]);

