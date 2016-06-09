'use strict';

cvApp.controller('DashController',[ "CvServices", '$http', "$window", function(CvServices, $http, $window) {
   var vm= this;
   
    vm.user = CvServices.getCv().then(function (data) {
       vm.user = data;
    });
    
    CvServices.getAllCvs().then(function (data) {
       vm.allCvs = data;
    });
    
    vm.displayCvForSpecificUser = function(cv){
        console.log(cv._id)
        CvServices.getResumesForUserById(cv._id);
        // $window.location.href = '/editor';
    }      
}]);


