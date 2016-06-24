'use strict';
cvApp.controller('DashController', ["CvServices", '$http', "$window", "$location", "$rootScope", function(CvServices, $http, $window, $location, $rootScope) {
    var vm = this;

    vm.resumes = [];
    vm.init = function() {
            vm.user = {};
            vm.resumes = [];
            CvServices.init();
            CvServices.getResumes().then(function(data) {
                //get all resumes to list in dashboard
                vm.resumes = data;
                vm.id = CvServices.getID();
                //hasCv to show or hide buttons(add new cv, edit my cv..)
                vm.hasCv = CvServices.hasCVforHIdeButtons();
                //('' - empty string 'cos is not neddet cv id to be pass when reading my cv becouse it is saved in session,
                // true - to be in editable mode,
                // false - to not redirect to /editor, only show basic information on dashboard)
                CvServices.getResumeForSelectedUser('', true, false).then(function(data) {
                    //get resume for my cv
                    vm.user = data;
                });
            });
        }
        //get cv for selected user
    vm.displayCvForSpecificUser = function(cv, value) {
        CvServices.getResumeForSelectedUser(cv._id, value, true);
    }

    //INSERT NEW  resume
    vm.insertResume = function() {
        var newResume = {
            basics: {
                firstName: null,
                lastName: null,
                jobTitle: null,
                picture: null, //session TODO: take it from session
                summary: null
            },
            contacts: {
                email: null,
                phone: null,
                city: null,
                country: null,
                website: null,
                social: [{
                    network: null
                }]
            },
            profSkills: [{
                name: null,
                level: null
            }],
            work: [{
                company: null,
                position: null,
                website: null,
                startDate: null,
                endDate: null,
                summary: null
            }],
            education: [{
                institution: null,
                area: null,
                studyType: null,
                startDate: null,
                endDate: null,
                summary: null
            }],
            skills: [{
                name: null,
                level: null
            }],
            languages: [{
                name: null,
                level: null
            }],
            createDate: {
                type: Date,
                default: Date.now
            },
            userID: {
                id: sessionStorage.getItem('currentUserID')
            },
            status: {
                value: "last"
            }
        };
        CvServices.insertResume(newResume)
            .then(function(response) {
                vm.resumes.push(newResume);
                console.log('New resume saved');
                //reset the form
                //  document.forms['newCvForm'].reset();
                console.log('Resume saved');
                //CvServices.getResumes();
                //CvServices.getResumeForSelectedUser('',true,true);
                //$location.path('/dashboard');
                // $location.path('/dashboard');
                // $location.path('/editor')
            }, function(error) {
                console.log('Unable to insert customer: ' + error.message);
            });

    };


    //DELETE resume
    vm.deleteResume = function(id) {
        CvServices.deleteResume(id)
            .then(function(data) {
                vm.status = "Deleted Resume , Please refresh resumes list";
                for (var i = 0; i < vm.resumes.length; i++) {
                    var currentCV = vm.resumes[i];
                    var cv = currentCV;
                    if (cv._id === id) {
                        vm.resumes.splice(i, i);
                        break;
                    }
                    window.location.reload();
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

    //check does current user has cv in database return true or false
    vm.checkCv = function(resumes) {
        console.log(resumes);
        if (resumes.length == 0) {
            return false;
        }
        for (var i = 0; i < resumes.length; i++) {
            if (resumes[i].userID.id === sessionStorage.currentUserID) {
                console.log('have a ID');
                return true;
            } else {
                console.log('dont have ID');
                return false;
            }
        }
    }
}]);