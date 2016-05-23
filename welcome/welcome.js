'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl', ['$scope','$firebase','CommonProp', function($scope,$firebase,CommonProp) {
	$scope.username = CommonProp.getUser();
	var firebaseObj = new Firebase("https://boiling-torch-2659.firebaseio.com/Events");
    	
         
  var sync = $firebase(firebaseObj);

  $scope.events = sync.$asArray();
  
	
}]);