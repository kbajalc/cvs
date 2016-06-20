'use strict'

cvApp.controller('authController', function($scope, $http, $rootScope, $route, $location) {
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.errorMessageUsername = '';
    $scope.errorMessagePasswordLength = '';
    $scope.errorMessageLoginPassword = '';
    $scope.errorMessageLoginUsername = '';
    $scope.route = $route;

    $scope.login = function() {
        $http.post('/auth/login', $scope.user).success(function(data) {
            if (data.state == 'success') {
                $rootScope.authenticated = true;
                $rootScope.currentUser = data.user.username;
                $rootScope.currentUserID = data.user._id;
                $rootScope.sess = data.user;
                sessionStorage.setItem('currentUser', $rootScope.sess.username);
                sessionStorage.setItem('currentUserID', $rootScope.sess._id);
                $location.path('/dashboard');
            } else {
                console.log("-->" + data.message[0]);
                $rootScope.sess = null;
                if (data.message == "The password is incorrect") {
                    $scope.errorMessageLoginPassword = data.message[0];
                    $scope.errorMessageLoginUsername = "";
                }else {
                    $scope.errorMessageLoginPassword = "";
                    $scope.errorMessageLoginUsername = data.message[0];
                }
            }
        });
    };

    $scope.register = function() {
        $http.post('/auth/signup', $scope.user).success(function(data) {
            if (data.state == 'success') {
                $rootScope.authenticated = true;
                $rootScope.currentUser = data.user.username;
                $rootScope.currentUserID = data.user._id;
                $rootScope.sess = data.user;
                sessionStorage.setItem('currentUser', $rootScope.sess.username);
                sessionStorage.setItem('currentUserID', $rootScope.sess._id);
                $location.path('/dashboard');
            } else {
                //login->auth->passport->routes->auth
                if ($scope.user.password.length >= 3) {
                    $scope.errorMessagePasswordLength = "";
                }
                if ($scope.user.password.length < 3) {
                    $scope.errorMessageUsername = "";
                    $scope.errorMessagePasswordLength = "Your password length must be at least 3 characters";
                } else {
                    $scope.errorMessageUsername = data.message[0];
                }
            }
        });
    };
});
