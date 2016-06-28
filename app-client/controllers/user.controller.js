'use strict';

cvApp.controller('user-Ctrl', ['$scope', 'userService', function($scope, userService) {
    var self = this; //calling side
    // var vc = this;
    self.user = {
        userid: null,
        name: '',
        email: ''
    }
    self.users = [];

    self.getAllUsers = function() {
        userService.getAllUsers()
            .then(function(response) {
                self.users = response;
            }, function(errResponse) {
                console.error('Error while fetching all users');
            });
    };

    self.registerUser = function(user) {
        userService.registerUser(user)
            .then(self.getAllUsers, function(errResponse) {
                console.error(errResponse);
            })
    };

    self.getUser = function(userId) {
        userService.getUser(userId)
            .then(function(response) {
                self.user = response.data;
                //self.users = getAllUsers;
            }, function(errResponse) {
                console.error('controller Error while fetching user!');
            });
    };

    self.getByUsername = function(username) {
        userService.getUser(username)
            .then(function(response) {
                self.user = response;
                //self.users = getAllUsers;
            }, function(errResponse) {
                console.error('controller Error while fetching user!');
            });
    };

    self.deleteUser = function(userId) {
        userService.deleteUser(userId)
            .then(self.getAllUsers, function(errResponse) {
                console.error('Error while deleting user');
            });
    };

    self.updateUser = function(user, userId) {
        userService.updateUser(user, userId)
            .then(self.getAllUsers, function(errResponse) {
                console.error('Error while updating user');
            })
    }

    function init() {
      self.getAllUsers();
    }

    init();

    self.submit = function() {
        if (self.user.userid === null) {
            console.log('Saving new user', self.user);

            self.registerUser(self.user);
        } else {
            self.updateUser(self.user, self.user.userId);
            console.log('User updated with id ', self.user.userId);
        }
        self.reset();
    };

    self.edit = function(userId) {
        console.log('id to be edited', userId);
        for (var i = 0; i < self.users.length; i++) {
            if (self.users[i].userid === userId) {
                self.user = angular.copy(self.users[i]);
                break;
            }
        }
    };

    self.remove = function(userId) {
        console.log('id to be deleted', id);
        if (self.user.userId === userId) {
            self.reset();
        }
        self.deleteUser(userId);
    };

    self.reset = function() {
        self.user = {
            userid: null,
            name: '',
            email: ''
        };
        $scope.myForm.$setPristine(); //reset form
    };
}]);
