'use strict';

cvApp.controller('AboutController',['CvServices', function(CvServices) {
    var vm= this;
    vm.showEditable = CvServices.showEditableMode();
    vm.user = CvServices.getBasicItems('userEmail');
    vm.contacts = CvServices.getAllContacts('userEmail');
    vm.statuses = [
        {value: 25, text: 'Beginner'},
        {value: 50, text: 'Intermediate'},
        {value: 75, text: 'Advanced'},
        {value: 100, text: 'Master'}
    ];

    vm.removeContacts = function(item) {
        vm.contacts.pop(item);
        CvServices.removeContacts('userEmail', index);
    };
}]);
