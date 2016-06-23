'use strict';
cvApp.controller('TechnicalSkillsController',['CvServices', function(CvServices) {
 var vm=this;
 vm.showEditable = CvServices.showEditableMode();
 vm.items =CvServices.getAllTechnicalSkill();
 vm.statuses = [
        {value: 25, text: 'Begginer'},
        {value: 50, text: 'Intermediate'},
        {value: 75, text: 'Advanced'},
        {value: 100, text: 'Master'}
    ];
  // remove user
  vm.removeSkill = function(index) {
    vm.items.splice(index, 1);
    CvServices.removeTechnicalSkill('userEmail', index);
  };

    vm.addSkill = function () {
         var profSkills= {
                name: vm.textName,
                level: vm.numLevel
            }
        vm.items.push(profSkills);
        CvServices.addNewSection();
        vm.textName = '';
        vm.numLevel = '';
    };

    vm.editTechnicalSkill= function(item, index){
      var profSkills= {
             name: item.name,
             level: item.level
         }
         vm.items[index] = profSkills;
       CvServices.addNewSection();
    }
}]);
