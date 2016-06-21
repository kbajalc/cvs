'use strict';
cvApp.controller('PersonalSkillsController', ['CvServices',function(CvServices) {
 var vm=this;
 vm.showEditable = CvServices.showEditableMode();
 vm.items = CvServices.getAllPersonalSkill();
 vm.statuses = [
    {value: 25, text: 'Begginer'},
    {value: 50, text: 'Intermediate'},
    {value: 75, text: 'Advanced'},
    {value: 100, text: 'Master'}
 ];
  // remove user
  vm.removePerSkill = function(index) {
      vm.items.splice(index, 1);
     CvServices.removePersonallSkill("userEmail", index);
  };

    // vm.editPersonallSkill= function(item) {
    //     CvServices.editPersonallSkill('userEmail', item);
    //     console.log(item)
    // };

    vm.addPerSkill = function () {
        var skills ={
            name: vm.textName,
            level: vm.numLevel
        }
        vm.items.push(skills);
        CvServices.addNewSection();
        vm.textName = '';
        vm.numLevel = '';
    };
}]);
