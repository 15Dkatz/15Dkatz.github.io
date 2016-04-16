// angular.module('starter.services', [])

myApp.service('sharedExercises', ['FIREBASE_URL', '$rootScope', '$firebaseAuth', function(FIREBASE_URL, $rootScope, $firebaseAuth) {
  // var exerciseList = [];
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);
  var boardListRef, userRef;
  var firstname, lastname;
  var showLoginContent = true;
  var exTime=0;

  var giveList = [];
  var getList = [];

  auth.$onAuth(function(authUser) {
      if (authUser) {
        boardListRef = new Firebase(FIREBASE_URL);
        if (boardListRef) {
          boardListRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  giveList = snapshot.val()["giveList"];
                  getList = snapshot.val()["getList"];
                  console.log(giveList, "giveList");
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
    getGiveList: function() {
      console.log("returning giveList", giveList);
      return giveList;
    },

    getGetList: function() {
      return getList;
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

    setGiveList: function(newList) {
      boardListRef.update({"giveList": newList});
    },

    setGetList: function(newList) {
      // exerciseList = newList;
      // console.log("giveList", giveList);
      // giveList.push(newList);
      boardListRef.update({"getList": newList});
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

    // setGiveList: function() {
    // 	return giveList;
    // },

    setExTime: function(newExtime) {
    	exTime = newExtime;
    }

  }
}])
