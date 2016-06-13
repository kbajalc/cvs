cvApp.controller('authController', function($scope, $http, $rootScope, $location) {
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.error_message = '';

    $scope.login = function() {
        $http.post('/auth/login', $scope.user).success(function(data) {
            if (data.state == 'success') {
                $rootScope.authenticated = true;
                $rootScope.currentUser = data.user.username;
                $rootScope.sess = data.user;
                sessionStorage.setItem('currentUser', $rootScope.sess.username);
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

                $rootScope.sess = data.user;
                sessionStorage.setItem('currentUser', $rootScope.sess.username);
                $location.path('/dashboard');
            } else {
                $scope.error_message = data.message;
            }
        });
    };
});
