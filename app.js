(function () {
    angular
        .module('DianaWeb', ['ngRoute', 'ngCookies', 'angular-storage'])
        //.module('DianaWeb', ['ngRoute', 'ngCookies', 'RouteControllers', 'UserService', 'angular-storage'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .when('/aboutme', {
                templateUrl: 'templates/aboutme.html',
            })
            .when('/photos', {
                templateUrl: 'templates/photos.html',
            })
            .when('/buy', {
                templateUrl: 'templates/buy.html'
            })
            .when('/free', {
                templateUrl: 'templates/free.html'
            })
            .when('/video', {
                templateUrl: 'templates/videos.html'
            })
            .when('/login', {
                templateUrl: 'templates/auth/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'templates/auth/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
            .when('/logout', {
                template: " ",
                controller: 'LogoutController'
            })
            .when('/account', {
                templateUrl: 'templates/user/account.html',
                controller: 'AccountController',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http', 'UserService'];
    function run($rootScope, $location, $cookies, $http, UserService) {

        $rootScope.$on('$routeChangeSuccess', function(event, currentRoute){
            var templateDir = 'templates/',
                home = templateDir + 'home.html';

            if (currentRoute.templateUrl === home) {
                $rootScope.$emit('body:class:add', 'home-page');
            } else {
                $rootScope.$emit('body:class:removeAll');
            }
        });

        $rootScope.auth = false;
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            // check if user auth
            $rootScope.auth = true;
            // get logged user data as middleware
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    $rootScope.authUser = user;
                });

            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            // Todo: change to only private pages
            var account = $.inArray($location.path(), ['/account']) === -1;
            var loggedIn = $rootScope.globals.currentUser;

            if (!account && !loggedIn) {
                $location.path('/');
            }
            // if user login, lock login / register pages
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            if (loggedIn && !restrictedPage) {
                $location.path('/');
            }

            //if (restrictedPage && !loggedIn) {
            //    $location.path('/login');
            //}
        });
    }
})();