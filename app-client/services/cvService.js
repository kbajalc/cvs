//factory to get all resumes from db
cvApp.factory('CvServices', ['$http', '$q',"$location", function($http, $q, $location) {
    var vm = this;
    // var resumes = {};
    var ress='';
    var cvForUserId;

        var all;

    var getAllResumes = function() {
        var deferred = $q.defer();
        $http.get('api/resumes').
            success(function(data, status, headers, config) {
                return deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
            deferred.reject('Error occured while retrieving CVs');
            console.log("error");
         });
        return deferred.promise;
    }
    
    //   var getResumesForUser =  function(id) {
    //     var deferred = $q.defer();
    //     $http.get('api/resumes/'+id).
    //         success(function(data, status, headers, config) {
    //             return deferred.resolve(data);
    //     })
    //     .error(function(data, status, headers, config) {
    //         deferred.reject('Error occured while retrieving CVs');
    //         console.log("error");
    //      });
    //     return deferred.promise;
    // }
    
    
    function getAllResumesWithoutQ (){
        return $http.get('api/resumes')
            .then(function (res) {
                ress = res.data;
                return res.data;
            });
    };
   
    return {
         getResumesForUserById: function(id){
            var deferred = $q.defer();
            $http.get('api/resumes/'+id).
                success(function(data, status, headers, config) {
                    //console.log(data)
                    return deferred.resolve(data), $location.path('/editor');
            })
            .error(function(data, status, headers, config) {
                deferred.reject('Error occured while retrieving CVs');
                console.log("error");
            });
            return deferred.promise.then(function(data){
                    cvForUserId =  data;
                });
         },
         
        //function for dashboard
        getCv: function() {
            return getAllResumes().then(function(data){
                return data[0];
            });
        },
        getAllCvs: function() {
            return  getAllResumes();
        },
        //function for about section
        getBasicItems: function(userEmail) {
           return cvForUserId.basics;
        },
        displayCvForUser: function(userEmail) {
            //  $location.path( "/editor" );
           // return vm.resumes[0];
        },        
        
        //function for contact section
        
        //function fo experience
        getAllExperience: function(userEmail) {
         return cvForUserId.work;
        },
        addNewExperience: function(userEmail, experience) {
            //zapisi vo baza experience izgraden spored daden json od kero, ne znam kako
        },
        editExperience: function(userEmail, experience) {
            //smeni vo baza experience izgraden spored daden json od kero, ne znam kako
        },
        removeExperience: function(userEmail, item) {
            //izbrisi iskustvo od bazata za daden user, vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },


        //function for education
        getAllEducation: function(userEmail) {
             return cvForUserId.education;
        },
        addNewEducation: function(userEmail, education) {
            //zapisi vo baza education izgraden spored daden json od kero, ne znam kako
        },
        editEducation: function(userEmail, education) {
            //smeni vo baza education izgraden spored daden json od kero, ne znam kako
        },
        removeEducation: function(userEmail, item) {
            //izbrisi education od bazata za daden user,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },

        //function for personal skill section
        getAllPersonalSkill: function(userEmail) {
            return cvForUserId.skills;
        },
        addNewPersonallSkill: function(userEmail, item) {
            //zapisi vo baza new personal skill izgraden spored daden json od kero, ne znam kako
        },
        removePersonallSkill: function(userEmail, index) {
            //izbrisi personall skill od bazata za daden user po daden index-na koe pozicija se naoga vo bazatata,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },
        editPersonallSkill: function(userEmail, item) {
            //smeni vo baza personall skill  izgraden spored daden json od kero, ne znam kako
        },

        //function for technicall skill section
        getAllTechnicalSkill: function(userEmail) {
             return cvForUserId.profSkills;
        },
        addNewTechnicalSkill: function(userEmail, item) {
            //zapisi vo baza new Technical skill izgraden spored daden json od kero, ne znam kako
        },
        removeTechnicalSkill: function(userEmail, index) {
            //izbrisi Technical skill od bazata za daden user po daden index-na koe pozicija se naoga vo bazatata,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },
        editTechnicalSkill: function(userEmail, item) {
            //smeni vo baza Technical skill  izgraden spored daden json od kero, ne znam kako
        },

        //function for technicall skill section
        getAllLanguages: function(userEmail) {
             return cvForUserId.languages;
        },
        addNewLanguage: function(userEmail, item) {
            //zapisi vo baza new Technical skill izgraden spored daden json od kero, ne znam kako
        },
        removeLanguage: function(userEmail, index) {
            //izbrisi Technical skill od bazata za daden user po daden index-na koe pozicija se naoga vo bazatata,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
        },
        editLanguage: function(userEmail, item) {
            //smeni vo baza Technical skill  izgraden spored daden json od kero, ne znam kako
        }

    }
}]);