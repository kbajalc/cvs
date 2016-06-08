'use strict';

cvApp.controller('DashController',[ "CvServices", function(CvServices) {
    var vm= this;

    vm.user = CvServices.getCv();
    vm.allCvs= CvServices.getAllCvs();
        console.log(vm.allCvs)
}]);
