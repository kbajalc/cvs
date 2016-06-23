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

     vm.editExperience = function(item, index){
            var  work = {
                company: item.company,
                postion: item.position,
                website: item.website,
                startDate: item.startDate,
                endDate:item.endDate,
                summary: item.summary
            };
            vm.items[index] = work;
           CvServices.addNewSection();
           };

       vm.removeExperience = function(item){
          vm.items.pop(item)
          CvServices.removeExperience('userEmail', item);
          //alert("Delete is not done yet, Sorry!");
       }
}]);
