'use strict'

cvApp.controller('authController', function($scope, $http, $rootScope, $route, $location) {
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.error_message_username = '';
    $scope.error_message_password_length = '';
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
                $scope.error_message = data.message;
                $rootScope.sess = null;
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

                if ($scope.user.password.length < 3) {
                    console.log("bbbb");
                    $scope.error_message_password_length = "Your password length must be at least 3 characters";
                } else {
                    console.log("cccc");
                    $scope.error_message_username = data.message;
                }
                if ($scope.user.password.length >= 3) {
                    console.log("aaaa");
                    $scope.error_message_password_length = "";
                }
            }
        });
    };
});
