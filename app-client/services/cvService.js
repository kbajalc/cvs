//factory to get all resumes from db
cvApp.factory('CvServices', ['$http', '$q', "$location", "$rootScope", function($http, $q, $location, $rootScope) {
    var urlBase = '/api/resumes';
    var resume = [];
    var showEditableMode;
    var resumeCheck;
    var currentUserCV;
    var draftResume;
    //list for all resumes for currentUser
    var listOfloggedUsers = [];


    var addNewSection = function() {

        resume._id = null;
        resume.status.value = "latest";
        $http.post(urlBase, resume).then(function(response) {
            
            $location.path('/dashboard');
            $location.path('/editor');


        }, function(error) {
            console.log('Unable to insert customer: ' + error.message);
        })
    };

    return {
        //get all resumes
        getResumes: function() {
            var deferred = $q.defer();
            $http.get(urlBase).
            success(function(data) {
                    for (var obj in data) {
                        if (data[obj].userID.id === sessionStorage.currentUserID) {
                            listOfloggedUsers.push(data[obj])
                        }
                    }
                    if (listOfloggedUsers.length == 0) {
                        resumeCheck = false;
                    } else {
                        resumeCheck = true;
                    }

                    // get the last updated resume
                    currentUserCV = listOfloggedUsers[listOfloggedUsers.length - 1];
                    var hash = {};
                    var arrData = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].userID.id == sessionStorage.currentUserID) continue;
                        hash[data[i].userID.id] = (data[i]);
                    }
                    for (var a in hash) {
                        arrData.push(hash[a]);
                    }
                    return deferred.resolve(arrData);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject('Error occured while retrieving CVs');
                    console.log("error");
                });
            return deferred.promise;
        },
        getID: function() {
            return currentUserCV._id;
        },
        //initialing variables
        init: function() {
            resume = {};
            showEditableMode = '';
            resumeCheck = '';
            currentUserCV = {};
            listOfloggedUsers = [];
            //take current userID from session as a name for the image
            if (sessionStorage.currentUserID) $rootScope.currentImage = sessionStorage.currentUserID;
        },
        //View your resume in editiable mode
        getResumeForSelectedUser: function(id, value, redirect) {
            var deferred = $q.defer();
            showEditableMode = value;
            $http.get(urlBase + '/' + (id || currentUserCV._id)).success(function(data) {
                    if (redirect) {
                        if (value) {
                            return deferred.resolve(data), $location.path('/editor');
                        } else {
                            return deferred.resolve(data), $location.path('/resumeViewMode');
                        }
                    } else {
                        return deferred.resolve(data);
                    }

                })
                .error(function(data, status, headers, config) {
                    deferred.reject('Error occured while retrieving CVs');
                    console.log("error");
                });

            if (redirect) {
                return deferred.promise.then(function(data) {
                    resume = data;
                });
            } else {
                return deferred.promise;
            }

        },
        insertResume: function(resume) {
            window.location.reload();
            return $http.post(urlBase, resume);
        },

        updateResume: function() {
            resume.status.value = "draft";
            $http.put(urlBase + '/' + resume._id, resume);
            addNewSection();

        },
        deleteResume: function(id) {
            return $http.delete(urlBase + '/' + id);
        },
        //add new section
        //addNewSection: addNewSection,
        // if user has a resume , hide the new resume button
        hasCVforHIdeButtons: function() {
            return resumeCheck;
        },
        //editable mode when reading my cv, otherwise not
        showEditableMode: function() {
            return showEditableMode;
        },
        //function for about section
        getBasicItems: function() {
            return resume.basics;
        },
        //function for contact section
        getAllContacts: function() {
            return resume.contacts;
        },
        //function for work experience
        getAllExperience: function() {
            return resume.work;
        },
        //function for education
        getAllEducation: function() {
            return resume.education;
        },
        //function for personal skill section
        getAllPersonalSkill: function() {
            return resume.skills;
        },
        //function for technicall skill
        getAllTechnicalSkill: function(userEmail) {
            return resume.profSkills;
        },
        //function for language  section
        getAllLanguages: function() {
            return resume.languages;
        }
    }
}]);
