cvApp.controller('authController', function($scope, $http, $rootScope, $location) {
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.errorMessage = '';

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
                $scope.errorMessage = data.message;
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
                $location.path('/dashboard');
            } else {
                $scope.errorMessage = data.message;
            }
        });
    };
});
