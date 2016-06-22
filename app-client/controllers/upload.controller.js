'use strict';

cvApp.controller('uploadController', ['Upload', '$window', function(Upload, $window) {
    var vm = this;
    vm.submit = function() {
        if (vm.uploadForm.file.$valid && vm.file) {
            vm.upload(vm.file, sessionStorage.currentUserID);
        }
    }
    vm.upload = function(file, userID) {
        Upload.upload({
            url: 'api/upload/' + userID, //webAPI exposed to upload the file, send userID for image name
            data: {
                file: file
            }
        }).then(function(response) {
            if (response.data.errorCode === 0) { //on success
                $window.alert('Success ' + response.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function(response) { //on error
            console.log('Error status: ' + response.status);
            $window.alert('Error status: ' + response.status);
        }, function(evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // upload progress, too fast to observe, may be excluded
        });
    };
}]);
