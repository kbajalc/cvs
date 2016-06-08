cvApp.controller('LanguageController',['CvServices', function(CvServices) {
    var vm=this;
    vm.languages = CvServices.getAllLanguages('userEmail'); 


  // remove user
  vm.removeLang = function(index) {
    vm.languages.splice(index, 1);
    CvServices.removeLanguage('userEmail', index);
  };  
    
    vm.addLanguage = function () {
        
         var inserted=  {
                name: vm.textName,
                level: vm.numLevel
            }
        vm.languages.push(inserted);
        CvServices.addNewLanguage('userEmail', inserted);
        vm.textName = '';
        vm.numLevel = '';
    };
    
    vm.editLanguage= function(item) {
        CvServices.editLanguage('userEmail', item);
    };
}]);
