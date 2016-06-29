'use strict'
cvApp.controller('DashController', ['CvServices', '$http', '$window', '$location', '$rootScope', 'userService', function(CvServices, $http, $window, $location, $rootScope, userService) {
    var vm = this;
    vm.currentImg = 'img/avatar.png';
    vm.init = function() {
        var forUser = sessionStorage.currentUserID;
        vm.resumes = []
        CvServices.init();
        CvServices.getPublishResume().then(function(data) {
            vm.resumes = data;
        })
        CvServices.getLoggedUserCV().then(function(data) {
            vm.user = data.user;
            vm.id = data.user._id;
            vm.hasCv = data.check
        });
        if (forUser) {
            userService.getUser(forUser).then(function(res) {
                vm.currentImg = 'img/' + res.data.imgUrl;
                console.log(vm.currentImg);
                vm.basicUser = res.data;
            });
        }
    }

    // get cv for selected user
    vm.displayCvForSpecificUser = function(id, value) {
        CvServices.getResumeForSelectedUser(id || vm.id, value, true)
    }

    // INSERT NEW  resume
    vm.insertResume = function() {
        var newResume = {
            basics: {
                firstName: null,
                lastName: null,
                jobTitle: null,
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
                value: 'latest'
            },
            imgUrl: vm.currentImg

        }
        CvServices.insertResume(newResume)
            .then(function(response) {
                vm.resumes.push(newResume)
                console.log('New resume saved')
                console.log('Resume saved')
            }, function(error) {
                console.log('Unable to insert customer: ' + error.message)
            })
    }

    // publish resume with id
    vm.publishResume = function(resume) {
            toastr.success('Your resume is published successfully', {
                timeOut: 1000
            })
            CvServices.publishResume(resume);
        }
        // unpublish resume with id
    vm.unpublishResume = function(cv) {
        toastr.error('Your resume is unpublished successfully', {
            timeOut: 1000
        });
        CvServices.unpublishResume(cv.userID.id);
    }

    // if user has published version of resume, hidden the Unpublish button
    vm.checkPublishedCv = function() {
        // CvServices.hasPublished();
        if (vm.user.status.value == 'publish') {
            console.log('okkkkkkkkkkkkkkk');
        }
    }

    // DELETE resume
    vm.deleteResume = function(id) {
        CvServices.deleteResume(id)
            .then(function(data) {
                vm.status = 'Deleted Resume , Please refresh resumes list'
                for (var i = 0; i < vm.resumes.length; i++) {
                    var currentCV = vm.resumes[i]
                    var cv = currentCV
                    if (cv._id === id) {
                        vm.resumes.splice(i, i)
                        break
                    }
                    window.location.reload()
                }
            }, function(err) {
                vm.status = 'Unable to delete resume'
            })
    }

    // UPDATE resume
    vm.updateResume = function(id) {
            var cv
            for (var i = 0; i < vm.resumes.length; i++) {
                var currentCV = vm.resumes[i]
                if (currentCV._id === id) {
                    var cv = currentCV
                    break
                }
            } // end find the current cv
        } // end of update resume

    // check does current user has cv in database return true or false
    vm.checkCv = function(resumes) {

        if (resumes.length == 0) {
            return false
        }
        for (var i = 0; i < resumes.length; i++) {
            if (resumes[i].userID.id === sessionStorage.currentUserID) {
                console.log('have a ID')
                return true
            } else {
                console.log('dont have ID')
                return false
            }
        }
    }
}]);