'use strict';

var cvApp = angular.module('cvApp', ['ngRoute', 'ngResource', 'xeditable'])
    .config(function($routeProvider, $locationProvider) {

        // home page LOGIN
        $routeProvider.when('/', {
            templateUrl: '/views/login.template.html',
            controller: 'authController'
        });
        $routeProvider.when('/login', {
            templateUrl: '/views/login.template.html',
            controller: 'authController'
        });
        //DASHBOARD
        $routeProvider.when('/dashboard', {
            templateUrl: '/views/dashboard.template.html',
            controller: 'DashController',
            controllerAs: 'dash'
        });
        //CV EDITOR
        $routeProvider.when('/editor', {
            templateUrl: '/views/editor.template.html'
        });
        $routeProvider.when('/addResume', {
            templateUrl: '/views/addResume.template.html',
            controller: 'DashController',
            controllerAs: "dash"

        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }).run(function(editableOptions, $rootScope, $http, $location) {
            editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

            //Route restrictions

            $rootScope.$on('$locationChangeStart', function(event, next, current) {

                if (sessionStorage.currentUser == null) {
                    if (next.templateUrl == 'views/login.template.url') {} else {
                        $location.path('/');
                    }

                }

                if (sessionStorage.length > 0) {
                    $rootScope.currentUser = sessionStorage.currentUser;
                    $rootScope.authenticated = true;
                } else {
                    $rootScope.authenticated = false;

                }

                $rootScope.signout = function() {
                    $http.get('auth/signout');
                    $rootScope.authenticated = false;

                    sessionStorage.clear();
                      $location.path('/');
                };
            });});
