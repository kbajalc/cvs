'use strict';

//
    cvApp.factory('userService', ['$http', '$q', function($http, $q) {
        return {
            registerUser: function(user) {
                return $http.post('/api/users/', user)
                    .then(function(response) {
                        return response.message;
                    }, function(errResponse) {
                        console.error('Error while registering user!');
                        return $q.reject(errResponse);
                    });
            },

            getUser: function(userID) {
                return $http.get('/api/users/' + userID)
                    .then(function(response) {
                        return response;
                    }, function(errResponse) {
                        console.error('Error while fetching user!');
                        //return $q.reject(errResponse);
                    });
            },

            getByUsername: function(username) {
                return $http.get('/api/users/:' + username)
                    .then(function(response) {
                        return response.message;
                    }, function(errResponse) {
                        console.error('Error while fetching user!');
                        return $q.reject(errResponse);
                    });
            },

            updateUser: function(user, userID) {
                return $http.put('/api/users/' + userID, user)
                    .then(function(response) {
                        return response.message;
                    }, function(errResponse) {
                        console.error('Error while updating user!');
                        //return $q.reject(errResponse);
                    });
            },

            deleteUser: function(userID) {
                return $http.delete('/api/users/:' + userID)
                    .then(function(response) {
                        return response.message;
                    }, function(errResponse) {
                        console.error('Error while deleting user!');
                        return $q.reject(errResponse);
                    });
            },

            getAllUsers: function() {
                return $http.get('/api/users/')
                    .then(function(response) {
                        return response.data || [];
                    }, function(errResponse) {
                        console.error('service Error while fetching all users!');
                        // return $q.reject(errResponse);
                    });
            }
        };
    }]);
