cvApp.controller('TechnicalSkillsController',['CvServices', function(CvServices) {
 var vm=this;
 vm.techSkills =CvServices.getAllTechnicalSkill('userEmail');
  // remove user
  vm.removeSkill = function(index) {
    vm.techSkills.splice(index, 1);
    CvServices.removeTechnicalSkill('userEmail', index);
  };  
    
    vm.addSkill = function () {        
         var inserted= {
                id: vm.techSkills.length + 1,
                name: vm.textName,
                level: vm.numLevel
            }
        vm.techSkills.push(inserted);
        CvServices.addNewTechnicalSkill('userEmail', inserted);
        
        vm.textName = '';
        vm.numLevel = '';
    };
    
    vm.editTechnicalSkill= function(item){
       CvServices.editTechnicalSkill('userEmail', item); 
    }
}]);