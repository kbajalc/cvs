'use strict';

var cvApp = angular.module('cvApp', ['ngRoute', 'ngResource', 'xeditable'])
    .config(function($routeProvider, $locationProvider) {

        // home page LOGIN
        $routeProvider.when('/', {
            templateUrl: '/views/login.template.html',
            controller: 'user-Ctrl',
            //css: ['/css/login.css', '/css/normalize.css']
        });
        $routeProvider.when('/login', {
            templateUrl: '/views/login.template.html',
            controller: 'user-Ctrl',
          //  css: ['/css/login.css', '/css/normalize.css','/css/style.css']
        });
        //DASHBOARD
        $routeProvider.when('/dashboard', {
            templateUrl: '/views/dashboard.template.html',
            controller: 'DashController'
        });
        //CV EDITOR
        $routeProvider.when('/editor', {
            templateUrl: '/views/editor.template.html',

            //css: 'css/editor.css'
        })

        $routeProvider.otherwise({
            redirectTo: '/'

        });

        $locationProvider.html5Mode(true);
  }).run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
