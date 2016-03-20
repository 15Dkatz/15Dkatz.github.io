myApp.controller('RegistrationController',
  ['$scope', 'Authentication',
  function($scope, Authentication) {
  

  $scope.register = function(firstname, lastname, email, password) {
    var user = {
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
      'password': password
    }

    Authentication.register(user);

  }; // register

}]); // Controller
