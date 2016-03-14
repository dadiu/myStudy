var myApp = angular.module("myApp",["ngRoute"]);

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
			controller : 'mainController'
		})
		.when('/about', {
			templateUrl : 'pages/about.html',
			controller : 'aboutController'
		})
		.when('/contact', {
			templateUrl : 'pages/contact.html',
			controller : 'contactController'
		})
		.otherwise({
			redirectTo : '/'
		});

	//$locationProvider.html5Mode(true);
});

myApp.controller("mainController", function($scope){
	$scope.message = "this is home";
});

myApp.controller("aboutController", function($scope){
	$scope.message = "this is about";
});

myApp.controller("contactController", function($scope){
	$scope.message = "this is contact";
});
