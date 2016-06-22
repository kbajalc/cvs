'use strict';
cvApp.controller('AboutController', ['CvServices', '$rootScope', function(CvServices, $rootScope) {
    var vm = this;
    vm.showEditable = CvServices.showEditableMode();
    vm.user = CvServices.getBasicItems();
    vm.items = CvServices.getAllContacts();
    vm.statuses = [{
        value: 25,
        text: 'Beginner'
    }, {
        value: 50,
        text: 'Intermediate'
    }, {
        value: 75,
        text: 'Advanced'
    }, {
        value: 100,
        text: 'Master'
    }];
    var init = function() {
        if (sessionStorage.currentUserID) $rootScope.currentImage = sessionStorage.currentUserID;
    }

    init();
    vm.addContact = function() {
        var contacts = vm.items;

        switch (vm.contact.selected) {
            case 'email':
                contacts.email = vm.contact.textInput;
                break;
            case 'phone':
                contacts.phone = vm.contact.textInput;
                break;
            case 'city':
                contacts.city = vm.contact.textInput;
                break;
            case 'country':
                contacts.country = vm.contact.textInput;
                break;
            case 'website':
                contacts.website = vm.contact.textInput;
                break;
            case 'social':
                contacts.social.push({
                    network: vm.contact.textInput
                });
                break;
            default:
                contacts = vm.items;
        }
        vm.items = contacts;
        console.log('pred da se asdd  ');
        console.log(vm.items);
        CvServices.addNewSection();
        vm.contact.textInput = '';
    }
    vm.removeContacts = function(item) {
        vm.items.pop(item);
        CvServices.removeContacts('userEmail', index);
    };
}]);
