/* eslint-disable */
'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.home', [
    'ngRoute',
    'myApp.login'
]).
config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: './fonts/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', [function() {

    }]);
