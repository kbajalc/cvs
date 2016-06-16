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
    }).run(function(editableOptions, $rootScope, $http, $location, $route) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

        //Route restrictions

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var nextPath = $location.path(),
                nextRoute = $route.routes[nextPath];
            console.log($location.path());
            console.log($route.routes[$location.path()]);
            if (sessionStorage.currentUser == null) {
                if (next.templateUrl == 'views/login.template.url') {} else {

                    $location.path('/');

                }

            } else if (nextPath === '/' || nextPath === '/login') $location.path('/dashboard');

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
        });
    });
