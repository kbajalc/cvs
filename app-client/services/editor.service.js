cvApp.factory('CvServices', function($http){
        //  function get(url, data) {
        //     var config = { headers: {} };
        //     config.headers['X-Requested-With'] = "XMLHttpRequest";
        //     $http.get(url).success(response => {
        //         console.log("response: ", response);
        //         return response;
        //     });
        //  }

    //array for work experience
    var experienceItems  = [
        {
            'company' : 'iTgmaa',
            'position': 'Developer',
            'website' : 'www.itgma.com',
            'startDate' : new Date(2015, 1, 15),
            'endDate':  new Date(2016, 5, 15),
            'summary' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quibusdam, vitae mollitia. Expedita deleniti minima, possimus doloremque ex rerum modi maxime consequuntur mollitia, voluptatibus voluptatum quisquam quos, nesciunt excepturi pariatur.Lorem ipsum dolor                         sit amet, consectetur adipisicing elit. Officia enim quisquam, consectetur ut explicabo eos delectus harum alias nesciunt deserunt quis? Ea libero quibusdam adipisci nemo placeat, quod, obcaecati perspiciatis? '
        },
        {
            'company' : 'iTgma',
            'position': 'Tester',
            'website' : 'website.com',
            'startDate' : new Date(1984, 4, 15),
            'endDate': new Date(1984, 4, 15),
            'summary' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quibusdam, vitae mollitia. Expedita deleniti minima, possimus doloremque ex rerum modi maxime consequuntur mollitia, voluptatibus voluptatum quisquam quos, nesciunt excepturi pariatur.Lorem ipsum dolor                         sit amet, consectetur adipisicing elit. Officia enim quisquam, consectetur ut explicabo eos delectus harum alias nesciunt deserunt quis? Ea libero quibusdam adipisci nemo placeat, quod, obcaecati perspiciatis? '
        }
    ];

    var educationItems =[
         {
            'institution' : 'FINKI',
            'area': 'PET',
            'studyType' : 'Bachelor',
            'startDate' : new Date(2010, 1, 15),
            'endDate':  new Date(2016, 5, 15),
            'summary' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quibusdam, vitae mollitia. Expedita deleniti minima, possimus doloremque ex rerum modi maxime consequuntur mollitia, voluptatibus voluptatum quisquam quos, nesciunt excepturi pariatur.Lorem ipsum dolor                         sit amet, consectetur adipisicing elit. Officia enim quisquam, consectetur ut explicabo eos delectus harum alias nesciunt deserunt quis? Ea libero quibusdam adipisci nemo placeat, quod, obcaecati perspiciatis? '
        },
        {
            'institution' : 'American',
            'area': 'PET',
            'studyType' : 'Bachelor',
            'startDate' : new Date(2016, 4, 15),
            'endDate': new Date(1984, 4, 15),
            'summary' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quibusdam, vitae mollitia. Expedita deleniti minima, possimus doloremque ex rerum modi maxime consequuntur mollitia, voluptatibus voluptatum quisquam quos, nesciunt excepturi pariatur.Lorem ipsum dolor                         sit amet, consectetur adipisicing elit. Officia enim quisquam, consectetur ut explicabo eos delectus harum alias nesciunt deserunt quis? Ea libero quibusdam adipisci nemo placeat, quod, obcaecati perspiciatis? '
        }
    ];

    var personallSkillItems=[{
            id: 1,
            name:'CREATIVE',
            level:65,

        },
        {
            id: 2,
            name:'PATIENT',
            level:55,

        },
        {
            id: 3,
            name:'TEAM WORK',
            level:65,

        },
        {
            id: 4,
            name:'FLEXIBLE',
            level:65,

        },
        {
            id: 5,
            name:'ORGANIZED',
            level:65,

        },
        {
            id: 6,
            name:'RESPONSIBLE',
            level:65,

        }];

        var technicallSkillsitems = [
        {
            id: 1,
            name:'ACTIONSCRIPT',
            level:65,

        },
        {
            id: 2,
            name:'JAVASCRIPT',
            level:55,

        },
        {
            id: 3,
            name:'PROCESSING',
            level:45,

        },
        {
            id: 4,
            name:'JAVA',
            level:65,

        },
        {
            id: 5,
            name:'C#',
            level:75,

        },
        {
            id: 6,
            name:'PHP',
            level:80,

        },
        {
            id: 7,
            name:'HTML',
            level:90,

        },
        {
            id: 8,
            name:'CSS',
            level:55,

        },
        {
            id: 9,
            name:'JSON',
            level:65,

        },
        {
            id: 10,
            name:'XML',
            level:55,

        },
        {
            id: 11,
            name:'JQUERY',
            level:65,

        },
        {
            id: 12,
            name:'ANGULARJS',
            level:80,

        }
  ];

  var languageItems = [
        {
            id: 1,
            name:'ENGLISH',
            level:65,

        },
        {
            id: 2,
            name:'GERMAN',
            level:55,

        },
        {
            id: 3,
            name:'SERBIAN',
            level:65,

        },
        {
            id: 4,
            name:'CROATIAN',
            level:65,

        }
  ];

  var basicsItems = {
        "fistName" : "John",
        "lastname" : "Doe",
        "jobTittle" : "Front-End developer",
        "picture" : "",
        "summary" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, porro. Ea iste delectus cumque provident sunt minus tenetur, soluta at vero? Ab alias voluptatum natus voluptatibus eaque cumque quos numquam"
    };

  var contactItem = [{
        "email" : "john@gmail.com",
        "phone" : "123456789",
        "city" : "Skopje",
        "countryCode" : "Macedonia",
        "website" : "http://dkeroski.com",
	    "social": [
            {
              "network": "facebook.com",
	        },
             {
              "network": "twitter.com",
	        }]
      }];

    return {
            //function for about section
            getBasicItems: function(userEmail){
                return basicsItems;
            },
            //function for contact section


            //function fo experience
            getAllExperience: function (userEmail) {
                //treba da se zeme od baza experience za najaven user - userEmail
                return experienceItems;
            },
            addNewExperience:function(userEmail,experience){
                //zapisi vo baza experience izgraden spored daden json od kero, ne znam kako
            },
            editExperience:function(userEmail, experience){
                 //smeni vo baza experience izgraden spored daden json od kero, ne znam kako
            },
            removeExperience:function(userEmail, item) {
                //izbrisi iskustvo od bazata za daden user, vo item e jsono od experience i treba da se najde od baza i da se izbrise
            },


            //function for education
            getAllEducation: function(userEmail) {
                return educationItems;
            },
            addNewEducation:function(userEmail, education){
                //zapisi vo baza education izgraden spored daden json od kero, ne znam kako
            },
            editEducation:function(userEmail, education){
                 //smeni vo baza education izgraden spored daden json od kero, ne znam kako
            },
            removeEducation:function(userEmail, item) {
                //izbrisi education od bazata za daden user,  vo item e jsono od experience i treba da se najde od baza i da se izbrise
            },

            //function for personal skill section
            getAllPersonalSkill: function(userEmail){
                return personallSkillItems;
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
            getAllTechnicalSkill: function(userEmail){
                return technicallSkillsitems;
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
            getAllLanguages: function(userEmail){
                return languageItems;
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
    });
