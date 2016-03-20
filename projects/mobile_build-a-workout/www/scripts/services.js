angular.module('starter.services', [])

myApp.service('sharedExercises', ['FIREBASE_URL', '$rootScope', '$firebaseAuth', function(FIREBASE_URL, $rootScope, $firebaseAuth) {
  var exerciseList = [];
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);
  var exerciseListRef, userRef;
  var firstname, lastname;
  var showLoginContent = true;
  var exTime=0;

  auth.$onAuth(function(authUser) {
      if (authUser) {
        exerciseListRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/exercises');
        if (exerciseListRef) {
          exerciseListRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  exerciseList = snapshot.val()["exerciseList"];
                  // userName = snapshot.val()[""]
                  // console.log("exerciseList:", $scope.exerciseList);
                  showLoginContent = false;
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
        userRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id);
       	if (userRef) {
          userRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  // exerciseList = snapshot.val()["exerciseList"];
                  firstname = snapshot.val()["firstname"];
                  lastname = snapshot.val()["lastname"];
                  // console.log("exerciseList:", $scope.exerciseList);
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
      }
  })

  return {
    getExerciseList: function() {
      
      return exerciseList;
    },

    getFirstname: function() {
    	return firstname;
    },

    getLastname: function() {
    	return lastname;
    },

    getShowLoginContent: function() {
	 	return showLoginContent;
	},

    setExerciseList: function(newList) {
      exerciseList = newList;
      exerciseListRef.update({"exerciseList": newList});
    },

    updateAccountFirstname: function(newFirstname) {
    	userRef.update({"firstname": newFirstname});
    },

    updateAccountLastname: function(newLastname) {
    	userRef.update({"lastname": newLastname});
    },

    updateAccountEmail: function(newEmail) {
    	userRef.update({"email": newEmail});
    },

    getExTime: function() {
    	return exTime;
    },

    setExTime: function(newExtime) {
    	exTime = newExtime;
    }

  }
}])
