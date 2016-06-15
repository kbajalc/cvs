'use strict';


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

            getUser: function(user_id) {
                return $http.get('/api/users/:' + user_id)
                    .then(function(response) {
                        return response.message;
                    }, function(errResponse) {
                        console.error('Error while fetching user!');
                        return $q.reject(errResponse);
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

            updateUser: function(user, user_id) {
                return $http.put('/api/users/:' + user_id, user)
                    .then(function(response) {
                        return response.message;
                    }, function(errResponse) {
                        console.error('Error while updating user!');
                        return $q.reject(errResponse);
                    });
            },

            deleteUser: function(user_id) {
                return $http.delete('/api/users/:' + user_id)
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
