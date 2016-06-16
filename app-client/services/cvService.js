//factory to get all resumes from db
cvApp.factory('CvServices', ['$http', '$q', "$location", "$rootScope", function($http, $q, $location, $rootScope) {
    var urlBase = '/api/resumes';
    var ress = '';
    var resume = '';
    var showEditableMode;
    var currentUserCV;

    return {
        getResumes: function() {
            var deferred = $q.defer();
            $http.get(urlBase).
            success(function(data) {
                    for (var obj in data) {
                        if (data[obj].userID.id === sessionStorage.currentUserID) {
                            currentUserCV = data[obj];
                        }
                    }
                    return deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject('Error occured while retrieving CVs');
                    console.log("error");
                });
            return deferred.promise;
        },
        insertResume: function(resume) {
            return $http.post(urlBase, resume);
        },
        updateResume: function(resume) {
            return $http.put(urlBase + '/' + resume.ID, resume)
        },
        deleteResume: function(id) {
            return $http.delete(urlBase + '/' + id);
        },
        getResumeForSelectedUser: function(id, value, redirect) {
            var deferred = $q.defer();
            $http.get(urlBase + '/' + (id || currentUserCV._id)).success(function(data) {
                    if (redirect) {
                        return deferred.resolve(data), $location.path('/editor');
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
        //function for about section
        getBasicItems: function(userEmail) {
            return resume.basics;
        },
        //function for contact section
        getAllContacts: function() {
            return resume.contacts;
        },
        //function fo experience
        getAllExperience: function(userEmail) {
            return resume.work;
        },
        addNewExperience: function(userEmail, experience) {
            resume._id = null;
            $http.post(urlBase, resume).then(function(response) {
                console.log(response.data.message)
            }, function(error) {
                console.log('Unable to insert customer: ' + error.message);
            })
        },
        removeExperience: function(userEmail, item) {
            //izbrisi iskustvo od bazata za daden user, vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },
        //function for education
        getAllEducation: function(userEmail) {
            return resume.education;
        },
        addNewEducation: function(userEmail, education) {
            //zapisi vo baza education izgraden spored daden json od kero
        },
        removeEducation: function(userEmail, item) {
            //izbrisi education od bazata za daden user,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },

        //function for personal skill section
        getAllPersonalSkill: function(userEmail) {
            return resume.skills;
        },
        addNewPersonallSkill: function(userEmail, item) {
            //zapisi vo baza new personal skill izgraden spored daden json od kero
        },
        removePersonallSkill: function(userEmail, index) {
            //izbrisi personall skill od bazata za daden user po daden index-na koe pozicija se naoga vo bazatata,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },

        //function for technicall skill section
        getAllTechnicalSkill: function(userEmail) {
            return resume.profSkills;
        },
        addNewTechnicalSkill: function(userEmail, item) {
            //zapisi vo baza new Technical skill izgraden spored daden json od kero
        },
        removeTechnicalSkill: function(userEmail, index) {
            //izbrisi Technical skill od bazata za daden user po daden index-na koe pozicija se naoga vo bazatata,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },

        //function for technicall skill section
        getAllLanguages: function(userEmail) {
            return resume.languages;
        },
        addNewLanguage: function(userEmail, item) {
            //zapisi vo baza new Technical skill izgraden spored daden json od kero
        },
        removeLanguage: function(userEmail, index) {
            //izbrisi Technical skill od bazata za daden user po daden index-na koe pozicija se naoga vo bazatata,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },
        showEditableMode: function() {
            return showEditableMode;
        }

    }
}]);