// // 'use strict';
// //factorie for all resumes
// cvApp.factory('my_DashService', ['$http', function($http) {
//
//         var urlBase = '/api/resumes';
//         var dataFactory = {};
//        //getall resumes
//         dataFactory.getResumes = function () {
//             return $http.get(urlBase);
//         };
//        //get resume with specific ID
//         dataFactory.getResume = function (id) {
//             return $http.get(urlBase + '/' + id);
//         };
//      //save new resume
//         dataFactory.insertResume = function (resume) {
//             return $http.post(urlBase, resume);
//         };
//     //update specidic id
//         dataFactory.updateResume = function (resume) {
//             return $http.put(urlBase + '/' + resume.ID, resume)
//         };
//
//         dataFactory.deleteResume = function (id) {
//             return $http.delete(urlBase + '/' + id);
//         };
//         //return object with resumes
//         return dataFactory;
//     }]);
// // 'use strict';
