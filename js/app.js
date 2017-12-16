angular.module('DianaWeb',['ngRoute', 'RouteControllers']);

angular.module('TodoApp').config(function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true); // Enable href routing without hashes

	        $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController',
    })
  		.when('/aboutme', {
			templateUrl:'templates/aboutme.html',
	})
		.when('/photos', {
			templateUrl:'templates/photos.html',
	})
		.when('/login', {
			templateUrl: 'templates/login.html',
	})
		.when('/buy', {
			templateUrl: 'templates/buy.html',
	})
		.when('/free', {
			templateUrl: 'templates/free.html'
			controller: 'FreeController',
		})
		.when('/video', {
			templateUrl: 'templates/videos.html'
	})
		.when('/register', {
			templateUrl:'templates/register.html',
			controller: 'RegisterController',
	});
});