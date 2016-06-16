cvApp.controller('PersonalSkillsController', ['CvServices',function(CvServices) {
 var vm=this;
 vm.showEditable = CvServices.showEditableMode();
 vm.perSkills = CvServices.getAllPersonalSkill("userEmail");
 vm.statuses = [
    {value: 25, text: 'Begginer'},
    {value: 50, text: 'Intermediate'},
    {value: 75, text: 'Advanced'},
    {value: 100, text: 'Expert'}
 ];
  // remove user
  vm.removePerSkill = function(index) {
      vm.perSkills.splice(index, 1);
     CvServices.removePersonallSkill("userEmail", index);
  };

    // vm.editPersonallSkill= function(item) {
    //     CvServices.editPersonallSkill('userEmail', item);
    //     console.log(item)
    // };
      
    vm.addPerSkill = function () {        
        var inserted ={
            name: vm.textName,
            level: vm.numLevel
        }
        vm.perSkills.push(inserted);
        CvServices.addNewPersonallSkill('userEmail', inserted);      
        vm.textName = '';
        vm.numLevel = '';
    };
}]);