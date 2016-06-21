'use strict';
cvApp.controller('WorkExperienceController', ['CvServices', function(CvServices) {
    var vm = this;
    vm.items= CvServices.getAllExperience();
    vm.showEditable = CvServices.showEditableMode();
    vm.addExperience = function(user){
        var  work = {
            company: user.company || '',
            position: user.position,
            website: user.website,
            startDate:user.dateFrom || '',
            endDate: user.dateTo || '',
            summary: user.summary
        };
        vm.items.push(work);
        CvServices.addNewSection();
        user.company='';
        user.position='';
        user.website='';
        user.dateFrom='';
        user.dateTo='';
        user.summary='';
     };

    //  vm.editExperience = function(user){
    //     var  inserted = {
    //         'company': user.company,
    //         'postion': user.position,
    //         'website': user.website,
    //         'startDate': user.startDate,
    //         'endDate':user.endDate,
    //         'summary': user.summary
    //     };

    //    CvServices.editExperience('userEmail', inserted);
    //    };

       vm.removeExperience = function(item){
          vm.items.pop(item)
          CvServices.removeExperience('userEmail', item);
          //alert("Delete is not done yet, Sorry!");
       }
}]);
