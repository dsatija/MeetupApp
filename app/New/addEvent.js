'use strict';

angular.module('myApp.addEvent', ['ngRoute','ngAnimate', 
  'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addEvent', {
    templateUrl: 'addEvent.html',
    controller: 'AddEventCtrl'
  });
}])

.controller('AddEventCtrl', ['$scope','$firebase','$location','CommonProp',function($scope,$firebase,$location,CommonProp) {
  $scope.today = function() {
    $scope.dt = new Date();

  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  };

  $scope.toggleMin = function() {
    $scope.minDate = new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.minDate = new Date();
    $scope.popup1.opened = true;
  };

var mystartdate=new Date();
  $scope.open2 = function() {
    $scope.popup2.opened = true;
   $scope.dateOptions2.minDate=new Date($scope.events.startdate);
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    minDate:new Date(),
    maxDate:new Date(2020,5,22)
  };

$scope.dateOptions2 = {
    minDate: null,
    maxDate:new Date(2020,5,22)
  };
  $scope.formats = ['dd-MMMM-yyyy hh:mm', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

    $scope.AddEvent = function(){
	var title = $scope.events.title;
  
        var location = $scope.events.location;
       var locationAfterGeoCode=$scope.events.location.formatted_address;
        var type = $scope.events.type;
        var startdate = $scope.events.startdate;
        var enddate = $scope.events.enddate;
        var description = $scope.events.desc;
        var organiser = $scope.events.organizer;
         var guests = $scope.events.guests;
	var geocoder= new google.maps.Geocoder();
	var firebaseObj = new Firebase("https://boiling-torch-2659.firebaseio.com/Events");
    	var fb = $firebase(firebaseObj);
/*geocoder.geocode({"address": location}, function(results, status)   {
  locationAfterGeoCode=JSON.parse(JSON.stringify(results));
  console.log(locationAfterGeoCode);
});*/

  console.log(locationAfterGeoCode);
	fb.$push({ title: title,location:locationAfterGeoCode ,type:type,startdate:startdate,enddate:enddate,description:description,organiser:organiser,guests:guests,emailId:CommonProp.getUser()}).then(function(ref) {
  		console.log(ref); 
  		$location.path('/welcome');
	}, function(error) {
  		console.log("Error:", error);
	});

    }
/*$scope.initSlider=function(){
      
       
       
        $('#datetimepicker6').datetimepicker();
        $('#datetimepicker7').datetimepicker({
            useCurrent: false //Important! See issue #1075
        });
        $("#datetimepicker6").on("dp.change", function (e) {
            $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker7").on("dp.change", function (e) {
            $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
        });
 

    //$scope.initSlider();
  }*/ 
}]);