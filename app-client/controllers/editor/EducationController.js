'use strict';

/**
 * @ngdoc function
 * @name cvApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cvApp
 */
cvApp.controller('EducationController', ['CvServices',function (CvServices) {
    var vm=this;
    vm.items  = CvServices.getAllEducation('userEmail');

    vm.addEducation = function(user){
        var  inserted = {
            'institution': user.institution,
            'area': user.area,
            'studyType': user.studyType,
            'startDate': user.dateFrom,
            'endDate':user.dateTo,
            'summary': user.summary
        };

       vm.items.push(inserted);
       CvServices.addNewEducation('userEmail', inserted);
        user.institution='';
        user.area='';
        user.studyType='';
        user.dateFrom='';
        user.dateTo='';
        user.summary='';
     };


     vm.editEducation = function(user){
        var  inserted = {
            'institution': user.institution,
            'area': user.area,
            'studyType': user.studyType,
            'startDate': user.dateFrom,
            'endDate':user.dateTo,
            'summary': user.summary
        };
        CvServices.editEducation('userEmail', inserted);
       };

       vm.removeEducation = function(item){
           vm.items.pop(item);
           CvServices.removeEducation('userEmail', item);
       }
}]);
