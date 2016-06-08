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
    var cvTemplate = {
        basics : {
            firstName: "Blazenka",
            lastName: "Parmakova",
            jobTitle: "Developer",
            picture: "img",
            summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, porro. Ea iste delectus cumque provident sunt minus tenetur, soluta at vero? Ab alias voluptatum natus voluptatibus eaque cumque quos numquama"
        },
        contacts:{
            email : "parmakova@yahoo.com",
            phone: "072555555",
            city: 'Skopje',
            country: "Macedonia",
            website: "itgma.com",
            social:[
                {
                    facebook : "facebook.com",
                    twitter: "twitter.com"
                }
            ]
        },
        profSkills: [{
            name: "Angular",
            level: "25"
        }],
        work: [
            {
                company: "iTgma",
                position: "Developer",
                website: "itgma.com",
                startDate: "01.01.2015",
                endDate: "12.12.2015",
                summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quibusdam, vitae mollitia. Expedita deleniti minima, possimus doloremque ex rerum modi maxime consequuntur mollitia, voluptatibus voluptatum quisquam quos, nesciunt excepturi pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia enim quisquam, consectetur ut explicabo eos delectus harum alias nesciunt deserunt quis? Ea libero quibusdam adipisci nemo placeat, quod, obcaecati perspiciatis? www.itgma.com"
            },
            {
                company: "iTgma1",
                position: "Developer1",
                website: "itgma.com",
                startDate: "01.01.2015",
                endDate: "12.12.2015",
                summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quibusdam, vitae mollitia. Expedita deleniti minima, possimus doloremque ex rerum modi maxime consequuntur mollitia, voluptatibus voluptatum quisquam quos, nesciunt excepturi pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia enim quisquam, consectetur ut explicabo eos delectus harum alias nesciunt deserunt quis? Ea libero quibusdam adipisci nemo placeat, quod, obcaecati perspiciatis? www.itgma.com"
            }
            ],
        education: [
            {
                institution: "Finki1",
                area: "Programming1",
                studyType: "bachelor1",
                startDate: "01.01.2015",
                endDate: "12.12.2015",
                summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis quibusdam, vitae mollitia. Expedita deleniti minima, possimus doloremque ex rerum modi maxime consequuntur mollitia, voluptatibus voluptatum quisquam quos, nesciunt excepturi pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia enim quisquam, consectetur ut explicabo eos delectus harum alias nesciunt deserunt quis? Ea libero quibusdam adipisci nemo placeat, quod, obcaecati perspiciatis?"
            }
        ],
        skills: [
           {
                name: "CREATIVE",
                level: "65"
           },
                      {
                name: "PATIENT",
                level: "25"
           },
                      {
                name: "TEAM WORK",
                level: "80"
           },
                      {
                name: "FLEXIBLE",
                level: "80"
           },
                      {
                name: "ORGANIZED",
                level: "40"
           }           
        ],
        languages: [
            {
                name: "ENGLISH",
                level: "95"
            },
            {
                name: "GERMAN",
                level: "9"
            },
                        {
                name: "SERBIAN",
                level: "66"
            }
         ],
        createDate: {
            type: Date,
            default: Date.now
        }

    };
   
  
    //array od site vraboteni sv
    var cvArray = [];

    return {
        
            //function for dashboard
            getCv : function(){
             return cvTemplate;
            },
            getAllCvs: function(){
              return cvArray;  
            },
            //function for about section
            getBasicItems: function(userEmail){
                return cvTemplate.basics;
            },
            //function for contact section


            //function fo experience
            getAllExperience: function (userEmail) {
                //treba da se zeme od baza experience za najaven user - userEmail
                return cvTemplate.work;
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
                return cvTemplate.education;
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
                return cvTemplate.skills;
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
                return cvTemplate.profSkills;
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
                return cvTemplate.languages;
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
