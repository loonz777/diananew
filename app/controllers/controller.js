angular.module('RouteControllers', [])
    //.controller('HomeController', function($scope) {
    //    $scope.title = "Welcome To Diana Gloster Website!";
    //})
    .controller('RegisterController', function($scope, UserAPIService, store) {
 
            $scope.registrationUser = {};
       		var URL = "https://morning-castle-91468.herokuapp.com/";
 
      		$scope.login = function() {
            UserAPIService.callAPI(URL + "accounts/api-token-auth/", $scope.data).then(function(results) {
                $scope.token = results.data.token;
                console.log($scope.token);
            }).catch(function(err) {
                console.log(err.data);
            });
        }
 
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;


            	UserAPIService.registerUser(URL + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    alert("You have successfully registered to Diana Gloster Website");
                }).catch(function(err) {
                    alert("Registration failed, please try again with another username.");
                    console.log(err);
                });
            }
        };
    });