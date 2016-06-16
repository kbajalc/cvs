'use strict';
cvApp.factory('Login', ['$http', function($http) {

  var baseUrl = "/api/resumes";
    var factory = {};
    factory.getAll = function(){
      return $http.get(baseUrl);
    };
    return factory;

}]);
