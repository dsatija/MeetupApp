/* eslint-disable */
'use strict';

angular.module('myApp.login', ['ngRoute', 'firebase', 'myApp.signup'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: '../fonts/login.html',
        controller: 'LoginCtrl'
    });
}])

// Home controller
.controller('LoginCtrl', ['$scope', '$location', 'CommonProp', '$firebaseAuth', function($scope, $location, CommonProp, $firebaseAuth) {
        var firebaseObj = new Firebase('https://boiling-torch-2659.firebaseio.com');
        var loginObj = $firebaseAuth(firebaseObj);

        $scope.user = {};
        $scope.SignIn = function(e) {
            e.preventDefault();
            var username = $scope.user.email;
            var password = $scope.user.password;
            loginObj.$authWithPassword({
                    email: username,
                    password: password
                })
                .then(function(user) {
                    //Success callback
                    console.log('Authentication successful');
                    CommonProp.setUser(user.password.email);
                    $location.path('/welcome');
                }, function(error) {
                    //Failure callback
                    console.log('Authentication failure');
                    $scope.regError = true;



                });
        };
    }])
    .service('CommonProp', function() {
        var user = '';

        return {
            getUser: function() {
                return user;
            },
            setUser: function(value) {
                user = value;
            }
        };
    });
