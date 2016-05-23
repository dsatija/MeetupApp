'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAnimate', 
  'ui.bootstrap',
  'google.places',
  'myApp.home',
  'myApp.addEvent',
  'myApp.signup',
  'mydatetimepicker',
  'myApp.welcome'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

angular.module('mydatetimepicker', [
  'datetimepicker'
]).
config(['datetimepickerProvider', function(datetimepickerProvider) {
							datetimepickerProvider.setOptions({
								locale: 'en'
							});
						}
					])
					.run([
						'$rootScope',
						function ($rootScope) {
							$rootScope.scoped = {
								format: 'HH:mm:ss'
							};
							$rootScope.vm = {
								datetime: '05/13/2011 6:30 AM'
							}
						}
]);
