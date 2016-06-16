cvApp.controller('LanguageController',['CvServices', function(CvServices) {
    var vm=this;
    vm.showEditable = CvServices.showEditableMode();
    vm.languages = CvServices.getAllLanguages('userEmail'); 
    vm.statuses = [
        {value: 25, text: 'Begginer'},
        {value: 50, text: 'Intermediate'},
        {value: 75, text: 'Advanced'},
        {value: 100, text: 'Expert'}
    ];
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
    
    // vm.editLanguage= function(item) {
    //     CvServices.editLanguage('userEmail', item);
    // };
}]);
