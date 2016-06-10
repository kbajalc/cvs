'use strict';

cvApp.controller('DashController',[ "CvServices","my_DashService", '$http', "$window", function(CvServices,my_DashService, $http, $window) {
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
   vm.insertResume = function () {
     var newResume;
       my_DashService.insertResume(newResume)
           .then(function (response) {
               vm.resumes.push(newResume);
               console.log('Resume saved');
           }, function(error) {
              console.log('Unable to insert customer: '+ error.message);
           });
    };

          //model schema
        //
        // var newResume = {
        //     basics: {
        //         firstName: '',
        //         lastName: '',
        //         jobTittle:'',
        //         picture: '',
        //         summary: ''
        //     },
        //     contacts: {
        //         email: '',
        //         phone: '',
        //         city: '',
        //         country: '',
        //         website: '',
        //         social: [{
        //             network: ''
        //         }]
        //     },
        //     profSkills: [{
        //         name: '',
        //         level: ''
        //     }],
        //     work: [{
        //         company: '',
        //         position: '',
        //         website: '',
        //         startDate: '',
        //         endDate: '',
        //         summary: ''
        //     }],
        //     education: [{
        //         institution: '',
        //         area: '',
        //         studyType: '',
        //         startDate: '',
        //         endDate: '',
        //         summary: ''
        //     }],
        //     skills: [{
        //         name: '',
        //         level: ''
        //     }],
        //     languages: [{
        //         name: '',
        //         level: ''
        //     }],
        //     createDate: {
        //         type: Date,
        //         default: Date.now
        //     }
        // };
        //

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
