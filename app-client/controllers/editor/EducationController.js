'use strict'
cvApp.controller('EducationController', ['CvServices', function (CvServices) {
  var vm = this
  vm.showEditable = CvServices.showEditableMode()
  vm.items = CvServices.getAllEducation()
  vm.addEducation = function (user) {
    if (!user) {
      alert('You must enter at least some value to be saved!')
    } else {
      var education = {
        institution: user.institution || '',
        area: user.area || '',
        studyType: user.studyType || '',
        startDate: user.dateFrom || '',
        endDate: user.dateTo || '',
        summary: user.summary || ''
      }
      vm.items.push(education)
      CvServices.updateResume()
      document.forms['newEducation'].reset()
    }
  }

  vm.editEducation = function (item, index) {
    var education = {
      institution: item.institution,
      area: item.area,
      studyType: item.studyType,
      startDate: item.dateFrom,
      endDate: item.dateTo,
      summary: item.summary
    }
    vm.items[index] = education
    CvServices.updateResume()
  }

  vm.removeEducation = function (index) {
    vm.items.splice(index, 1)
    CvServices.updateResume()
  }
}])
