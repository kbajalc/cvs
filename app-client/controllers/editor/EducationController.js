'use strict';
cvApp.controller('EducationController', ['CvServices',function (CvServices) {
    var vm=this;
    vm.showEditable = CvServices.showEditableMode();
    vm.items  = CvServices.getAllEducation();
    vm.addEducation = function(user){
        var  education = {
            institution: user.institution || '',
            area: user.area || '',
            studyType: user.studyType || '',
            startDate: user.dateFrom || '',
            endDate:user.dateTo || '',
            summary: user.summary || ''
        };
       vm.items.push(education);
       CvServices.addNewSection();
       user.institution='';
       user.area='';
       user.studyType='';
       user.dateFrom='';
       user.dateTo='';
       user.summary='';
     };

    //  vm.editEducation = function(){
    //     var  inserted = {
    //         'institution': user.institution,
    //         'area': user.area,
    //         'studyType': user.studyType,
    //         'startDate': user.dateFrom,
    //         'endDate':user.dateTo,
    //         'summary': user.summary
    //     };
    //     CvServices.editEducation('userEmail', inserted);
    //    };

       vm.removeEducation = function(item){
           vm.items.pop(item);
           CvServices.removeEducation(item);
       }
}]);
