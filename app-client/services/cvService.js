cvApp.factory('CvServices', ['$http', '$q', '$location', '$rootScope', 'userService', function($http, $q, $location, $rootScope, userService) {
    var urlBase = '/api/resumes'
    var urlpublish = '/api/publish'
    var urlunpublish = '/api/unpublish'
    var urlAllPublish = '/api/allPublishResumes/';
    var mylatestCV = '/api/currentUserCvID/';
    var resume = [];
    var showEditableMode;
    var resumeCheck;
    var currentUserCV;
    var draftResume;
    // list for all resumes for currentUser
    var listOfloggedUsers = [];

    var getPublishResume = function() {
        var deferred = $q.defer();
        $http.get(urlAllPublish + sessionStorage.currentUserID)
            .success(function(data) {
                if (data) {
                    return deferred.resolve(data);
                } else {
                    console.log("error");
                }
            })
            .error(function(data, status, headers, config) {
                deferred.reject('Error occured while retrieving CVs');
                console.log("error");
            });
        return deferred.promise;
    };

    var getLoggedUserCV = function() {
        var deferred = $q.defer();
        $http.get(mylatestCV + sessionStorage.currentUserID)
            .success(function(data) {
                if (data.length > 0) {
                    currentUserCV = data[0];
                    resume = data[0];
                    resumeCheck = true;
                } else {
                    currentUserCV = '';
                    resumeCheck = false;
                }
                return deferred.resolve({
                    user: currentUserCV,
                    check: resumeCheck
                });
            })
            .error(function(data, status, headers, config) {
                deferred.reject('Error occured while retrieving CVs');
                console.log("error");
            });
        return deferred.promise;
    };

    var init = function() {
        resume = {}
        showEditableMode = ''
        resumeCheck = ''
        currentUserCV = {}
        listOfloggedUsers = [];
        getPublishResume();
        getLoggedUserCV();
    }
    init();
    var getResumeForSelectedUser = function(id, value, redirect) {
        console.log(currentUserCV);
        var deferred = $q.defer()
        showEditableMode = value
        $http.get(urlBase + '/' + (id || currentUserCV._id)).success(function(data) {
                if (redirect) {
                    if (value) {
                        return deferred.resolve(data), $location.path('/editor')
                    } else {
                        return deferred.resolve(data), $location.path('/resumeViewMode')
                    }
                } else {
                    return deferred.resolve(data)
                }
            })
            .error(function(data, status, headers, config) {
                deferred.reject('Error occured while retrieving CVs')
                console.log('error')
            })

        if (redirect) {
            return deferred.promise.then(function(data) {
                resume = data
            })
        } else {
            return deferred.promise
        }
    }

    var addNewSection = function() {
        resume._id = null
        resume.status.value = 'latest'
        $http.post(urlBase, resume).then(function(response) {
            console.log(response)
            $location.path('/dashboard')
            $location.path('/editor')
        }, function(error) {
            console.log('Unable to insert customer: ' + error.message)
        })
    }

    // unpublish cv connect database
    var unpublishResume = function(userID) {
        return $http.put(urlunpublish + '/' + userID);
    }
    var publishResume = function(resume) {
        //  unpublishResume(resume.userID.id);
        return $http.put(urlpublish + '/' + resume._id, resume)
    }

    var unloadPage = function() {
        init();
        getLoggedUserCV().then(function(data) {
            resume = data.user;
            showEditableMode = true;
        });
    }
    window.onbeforeunload = unloadPage();
    return {
        getPublishResume: getPublishResume,
        getLoggedUserCV: getLoggedUserCV,
        publishResume: publishResume,
        unpublishResume: unpublishResume,
        addNewSection: addNewSection,
        // initialing variables
        init: init,
        getResumeForSelectedUser: getResumeForSelectedUser,
        getID: function() {
            return currentUserCV._id
        },
        insertResume: function(resume) {
            window.location.reload()
            return $http.post(urlBase, resume)
        },
        updateResume: function() {
            if (resume.status.value !== "publish") {
                resume.status.value = 'draft'
                $http.put(urlBase + '/' + resume._id, resume)
            }
            addNewSection();
            window.location.reload()
        },

        deleteResume: function(id) {
            return $http.delete(urlBase + '/' + id)
        },
        // if user has a resume , hide the new resume button
        hasCVforHIdeButtons: function() {
            return resumeCheck;
        },
        // editable mode when reading my cv, otherwise not
        showEditableMode: function() {
            return showEditableMode
        },
        // function for about section
        getBasicItems: function() {
            return resume.basics
        },
        // function for contact section
        getAllContacts: function() {
            return resume.contacts
        },
        // function for work experience
        getAllExperience: function() {
            return resume.work
        },
        // function for education
        getAllEducation: function() {
            return resume.education
        },
        // function for personal skill section
        getAllPersonalSkill: function() {
            return resume.skills
        },
        // function for technicall skill
        getAllTechnicalSkill: function(userEmail) {
            return resume.profSkills
        },
        returnImg: function() {
            return resume.imgUrl
        },
        // function for language  section
        getAllLanguages: function() {
            return resume.languages
        }
    }
}])
