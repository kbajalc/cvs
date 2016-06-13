cvApp.controller('AboutController',['CvServices', function(CvServices) {
    var vm= this;
    vm.showEditable = CvServices.getValueForEditable();
    vm.user = CvServices.getBasicItems('userEmail');   
    vm.contacts = CvServices.getAllContacts('userEmail'); 
    
    vm.removeContacts = function(item) {
        vm.contacts.pop(item);
        CvServices.removeContacts('userEmail', index);
    };  
}]);