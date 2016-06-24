'use strict';
cvApp.controller('LanguageController',['CvServices', function(CvServices) {
    var vm=this;
    vm.showEditable = CvServices.showEditableMode();
    vm.items = CvServices.getAllLanguages();
    vm.statuses = [
        {value: 25, text: 'Begginer'},
        {value: 50, text: 'Intermediate'},
        {value: 75, text: 'Advanced'},
        {value: 100, text: 'Expert'}
    ];

    vm.addLanguage = function () {
         var languages=  {
                name: vm.textName,
                level: vm.numLevel
            }
        vm.items.push(languages);
        CvServices.addNewSection();
        vm.textName = '';
        vm.numLevel = '';
    };
    vm.editLanguage= function(item, index) {
      var languages= {
             name: item.name,
             level: item.level
         }
      vm.items[index] = languages;
      CvServices.addNewSection();
    };
    vm.removeLang = function(index) {
      vm.items.splice(index, 1);
      CvServices.addNewSection();
    };
}]);
