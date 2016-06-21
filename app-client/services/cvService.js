//factory to get all resumes from db
cvApp.factory('CvServices', ['$http', '$q', "$location", "$rootScope", function ($http, $q, $location, $rootScope) {
    var urlBase = '/api/resumes';
    var resume = [];
    var showEditableMode;
    var resumeCheck;
    var currentUserCV;
    //list for all resumes for currentUser
    var listOfloggedUsers = [];
    function getResumes() {
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
            currentUserCV = listOfloggedUsers[listOfloggedUsers.length - 1] ;
            return deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
            deferred.reject('Error occured while retrieving CVs');
            console.log("error");
        });
        return deferred.promise;
      }

      function getResumeForSelectedUser(id, value, redirect) {
              showEditableMode = value;
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
          }
    return {

      //initialing variables
      init: function(){
         resume = {};
         showEditableMode ='';
         resumeCheck='';
         currentUserCV={};
         listOfloggedUsers = [];
      },
      //get all resumes
      getResumes: getResumes,
      getResumeForSelectedUser:getResumeForSelectedUser,
        insertResume: function(resume) {

            return $http.post(urlBase, resume);
        },
        updateResume: function (resume) {
            return $http.put(urlBase + '/' + resume.ID, resume)
        },
        deleteResume: function (id) {
            return $http.delete(urlBase + '/' + id);
        },

        //add new section
        addNewSection: function() {
            resume._id = null;
            console.log(resume);
            $http.post(urlBase, resume).then(function(response) {
                console.log(response);
                  // getResumes();
                  // getResumeForSelectedUser('', true, true);
              $location.path('/dashboard');
              $location.path('/editor')
            }, function(error) {
                console.log('Unable to insert customer: ' + error.message);
            })

        },
        // if user has a resume , hide the new resume button
        hasCVforHIdeButtons: function () {
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
        getAllContacts: function () {
            return resume.contacts;
        },
        removeContact: function(){
          //remove contact
        },
        //function fo experience

        getAllExperience: function() {
            return resume.work;
        },
        removeExperience: function(userEmail, item) {
            //izbrisi iskustvo od bazata za daden user, vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },
        //function for education
        getAllEducation: function() {
            return resume.education;
        },
        removeEducation: function(item) {

            //izbrisi education od bazata za daden user,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },
        //function for personal skill section

        getAllPersonalSkill: function() {
            return resume.skills;
        },
        removePersonallSkill: function(userEmail, index) {
            //izbrisi personall skill od bazata za daden user po daden index-na koe pozicija se naoga vo bazatata,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },
        //function for technicall skill
        getAllTechnicalSkill: function(userEmail) {
            return resume.profSkills;
        },
        removeTechnicalSkill: function(userEmail, index) {
            //izbrisi Technical skill od bazata za daden user po daden index-na koe pozicija se naoga vo bazatata,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },
        //function for technicall skill section

        getAllLanguages: function() {
            return resume.languages;
        },
        removeLanguage: function(userEmail, index) {
            //izbrisi Technical skill od bazata za daden user po daden index-na koe pozicija se naoga vo bazatata,  vo item e jsono od experience i treba da se najde od baza i da se izbrise

        }
    }
}]);
