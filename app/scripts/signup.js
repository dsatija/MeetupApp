/* eslint-disable */
'use strict';

angular.module('myApp.signup', ['ngRoute', 'firebase'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/signup', {
        templateUrl: '../fonts/signup.html',
        controller: 'SignupCtrl'
    });
}])

// Register controller
.controller('SignupCtrl', ['$scope', '$location', '$firebaseAuth', function($scope, $location, $firebaseAuth) {
    $scope.mesg = 'Hello';
    var firebaseObj = new Firebase('https://boiling-torch-2659.firebaseio.com');
    var auth = $firebaseAuth(firebaseObj);

    $scope.signUp = function() {
        if (!$scope.regform.$invalid) {
            var email = $scope.user.email;
            var password = $scope.user.password;
            if (email && password) {
                auth.$createUser(email, password)
                    .then(function() {
                        // do things if success
                        console.log('User creation success');
                        $location.path('/login');

                    }, function(error) {
                        // do things if failure
                        console.log(error);
                        $scope.regError = true;
                        $scope.regErrorMessage = error.message;
                    });
            }
        }
    };

}]);
