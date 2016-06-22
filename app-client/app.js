'use strict';

var cvApp = angular.module('cvApp', ['ngRoute', 'ngResource', 'xeditable', 'ngFileUpload'])
    .config(function($routeProvider, $locationProvider) {

        // home page LOGIN
        $routeProvider.when('/', {
            templateUrl: '/views/login.template.html',
            controller: 'authController',
            activeNav: 'navDashboard'
        });
        $routeProvider.when('/login', {
            templateUrl: '/views/login.template.html',
            controller: 'authController'
        });
        //DASHBOARD
        $routeProvider.when('/dashboard', {
            templateUrl: '/views/dashboard.template.html',
            controller: 'DashController',
            controllerAs: 'dash',
            activeNav: 'navDashboard'
        });
        //CV EDITOR
        $routeProvider.when('/editor', {
            templateUrl: '/views/editor.template.html'
        });
        $routeProvider.when('/addResume', {
            templateUrl: '/views/addResume.template.html',
            controller: 'DashController',
            controllerAs: 'dash'

        });
        //CV in VIEW mode
        $routeProvider.when('/resumeViewMode', {
            templateUrl: '/views/resumeInViewMode.tamplate.html',
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
        })
    }).directive('aboutDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/editor/about.template.html'

        };
    }).directive('personalSkillsDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/editor/personal.template.html'

        };
    }).directive('workExpDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/editor/work.template.html'

        };
    }).directive('educationDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/editor/education.template.html'

        };
    }).directive('techSkillsDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/editor/technical.template.html'

        };
    }).directive('languagesDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/editor/languages.template.html'

        };
        //directives for view mode the resume
    }).directive('aboutDirectiveView', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/preview/about.template.html'

        };
    }).directive('personalSkillsDirectiveView', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/preview/personal.template.html'

        };
    }).directive('workExpDirectiveView', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/preview/work.template.html'

        };
    }).directive('educationDirectiveView', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/preview/education.template.html'

        };
    }).directive('techSkillsDirectiveView', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/preview/technical.template.html'

        };
    }).directive('languagesDirectiveView', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/preview/languages.template.html'

        };
    });
