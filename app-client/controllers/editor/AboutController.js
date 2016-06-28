'use strict';
cvApp.controller('AboutController', ['CvServices', '$rootScope', 'userService', function(CvServices, $rootScope, userService) {
    var vm = this;

    vm.showEditable = CvServices.showEditableMode();
    vm.user = CvServices.getBasicItems();
    vm.items = CvServices.getAllContacts();
    vm.reviewImg = 'img/' + CvServices.returnImg();
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

    vm.init = function() {
        var forUser = sessionStorage.currentUserID;
        if (forUser) {
            userService.getUser(forUser).then(function(res) {
                vm.currentImg = 'img/' + res.data.imgUrl;
                vm.basicUser = res.data;
            });

        }

    }



    vm.init();
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
        CvServices.updateResume();
        //CvServices.addNewSection();
        vm.contact.textInput = '';
    }

    vm.addBasic = function() {
        vm.user.jobTitle = (vm.position && vm.position.textPosition) || '';
        vm.user.summary = vm.contact.textInput || '';
        CvServices.addNewSection();
        //vm.position.textPosition='';
        //vm.contact.textInput ='';
    }
    vm.editName = function(user) {
        console.log(user);
        // userService.getUser(sessionStorage.currentUserID).then(function(res){
        //   userService.updateUser(sessionStorage.currentUserID, res);
        // })

        vm.user.firstName = (user.firstName) || '';
        vm.user.lastName = (user.lastName) || '';
        CvServices.addNewSection();
        document.forms['rowformName'].reset();
    }

    vm.editContacts = function(item) {
        vm.items = item;
        CvServices.addNewSection();
    }
    vm.editBasics = function(item) {
        vm.user.about = item;
        CvServices.addNewSection();
    }
}]);
