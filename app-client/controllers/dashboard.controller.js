'use strict';

cvApp.controller('DashController', ["CvServices", "my_DashService", '$http', "$window", "$location", function(CvServices, my_DashService, $http, $window, $location) {
    var vm = this;
    vm.showEditable = CvServices.getValueForEditable();
    vm.user = CvServices.getCv().then(function(data) {
        vm.user = data;
        console.log(data);
    });

    CvServices.getAllCvs().then(function(data) {
        vm.allCvs = data;
    });

    vm.displayCvForSpecificUser = function(cv, value) {
        CvServices.getResumesForUserById(cv._id, value);
    }
    vm.editProfile = function(id) {
        CvServices.getResumesForUserById(id, true);

    }


    vm.resumes;
    vm.createResume;
    vm.updateResume;
    vm.allCvs;

    getResumes();
    //GET all resumes from DB
    function getResumes() {
        my_DashService.getResumes()
            .then(function(resumes) {
                vm.resumes = resumes.data;
            }, function(err) {
                console.log("Can not display users" + err.message);
            });
    }

    //INSERT NEW  resume
    vm.insertResume = function() {
        var newResume = {
            basics: {
                firstName: vm.basics.firstName,
                lastName: vm.basics.lastName,
                jobTitle: vm.basics.jobTittle,
                picture: '',
                summary: vm.basics.summary
            },
            contacts: {
                email: vm.contacts.email,
                phone: vm.contacts.phone,
                city: vm.contacts.city,
                country: vm.contacts.country,
                website: vm.contacts.website,
                social: [{
                    network: vm.contacts.social.network
                }]
            },
            profSkills: [{
                name: vm.profSkills.name,
                level: vm.profSkills.level
            }],
            work: [{
                company: vm.work.company,
                position: vm.work.position,
                website: vm.work.website,
                startDate: vm.work.startDate,
                endDate: vm.work.endDate,
                summary: vm.work.summary
            }],
            education: [{
                institution: vm.education.institution,
                area: vm.education.area,
                studyType: vm.education.studyType,
                startDate: vm.education.startDate,
                endDate: vm.education.endDate,
                summary: vm.education.summary
            }],
            skills: [{
                name: vm.skills.name,
                level: vm.skills.level
            }],
            languages: [{
                name: vm.languages.name,
                level: vm.languages.level
            }],
            createDate: {
                type: Date,
                default: Date.now
            },
            userID: {
                id: sessionStorage.getItem('currentUserID')
            }

        };
        my_DashService.insertResume(newResume)
            .then(function(response) {

                vm.resumes.push(newResume);
                alert('New resume saved');
                //reset the form
                document.forms['newCvForm'].reset();
                console.log('Resume saved');
                $location.path('/editor');
            }, function(error) {
                console.log('Unable to insert customer: ' + error.message);
            });
    };
    //DELETE resume
    vm.deleteResume = function(id) {
        my_DashService.deleteResume(id)
            .then(function(data) {
                vm.status = "Deleted Resume , Please refresh resumes list";
                for (var i = 0; i < vm.resumes.length; i++) {
                    var currentCV = vm.resumes[i];
                    var cv = currentCV;
                    if (cv._id === id) {
                        vm.resumes.splice(i, i);
                        break;
                    }
                }
            }, function(err) {
                vm.status = "Unable to delete resume";
            });
    };


    //UPDATE resume
    vm.updateResume = function(id) {
            var cv;
            for (var i = 0; i < vm.resumes.length; i++) {
                var currentCV = vm.resumes[i];
                if (currentCV._id === id) {
                    var cv = currentCV;
                    break;
                }
            } //end find the current cv
        } //end of update resume
}]);