'use strict';

cvApp.directive('uploadImage', function() {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: '/views/upload.template.html'
        // controller: 'uploadController',
        // controllerAs: 'up'

    };
});
