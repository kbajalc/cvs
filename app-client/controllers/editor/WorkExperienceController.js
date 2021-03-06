'use strict'
cvApp.controller('WorkExperienceController', ['CvServices', function(CvServices) {
    var vm = this
    vm.items = CvServices.getAllExperience()
    vm.showEditable = CvServices.showEditableMode()
    vm.addExperience = function(user) {
        if (!user) {
            alert('You must enter at least some value to be saved!')
        } else {
            var work = {
                company: user.company || '',
                position: user.position || '',
                website: user.website,
                startDate: user.dateFrom || '',
                endDate: user.dateTo || '',
                summary: user.summary || ''
            }
            vm.items.push(work)
            CvServices.updateResume()
            document.forms['newExperience'].reset()
        }
    }
    vm.editExperience = function(item, index) {
        var work = {
            company: item.company,
            postion: item.position,
            website: item.website,
            startDate: item.startDate,
            endDate: item.endDate,
            summary: item.summary
        }
        vm.items[index] = work
        CvServices.updateResume()
    }

    vm.removeExperience = function(index) {
        console.log('called ' + index)
        vm.items.splice(index, 1)
        CvServices.updateResume()
    }
    // custom filter, return not null values
    vm.notEmptyOrNull = function(item) {
        return !(item.name_fr === null || item.name_fr.trim().length === 0)
    }
}])