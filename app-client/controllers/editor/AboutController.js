cvApp.controller('AboutController',['CvServices', function(CvServices) {
    var vm= this;
    vm.user = CvServices.getBasicItems('userEmail');
    
}]);