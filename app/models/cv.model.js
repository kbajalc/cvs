//Schema for resumes
var mongoose = require('mongoose');

var ResumeSchema = new mongoose.Schema({

    "basics": {
        "name": String,
        "jobTittle": String,
        "picture": "",
        "summary": String
    },
    "contacts": {
        "email": String,
        "phone": String,
        "city": String,
        "country": String,
        "website": String,
        "social": [{
            "network": String
        }]
    },
    "profSkills": [{
        "name": String,
        "level": String
    }],
    "work": [{
        "company": String,
        "position": String,
        "website": String,
        "startDate": String,
        "endDate": String,
        "summary": String
    }],
    "education": [{
        "institution": String,
        "area": String,
        "studyType": String,
        "startDate": String,
        "endDate": String,
        "summary": String
    }],
    "skills": [{
        "name": String,
        "level": String
    }],
    "languages": [{
        "name": String,
        "level": String
    }],
    "createDate": {
        type: Date,
        default: Date.now
    }
    });
//     "properties": {
//         "basics": {
//             "type": "object",
//             "properties": {
//                 "firstName": {
//                     "type": "string"
//                 },
//                 "lastName": {
//                     "type": "string"
//                 },
//                 "picture": {
//                     "type": "string"
//                 },
//                 "email": {
//                     "type": "string"
//                 },
//                 "phone": {
//                     "type": "string"
//                 },
//                 "website": {
//                     "type": "string"
//                 },
//                 "summary": {
//                     "type": "string"
//                 },
//                 "location": {
//                     "type": "object",
//                     "properties": {
//                         "address": {
//                             "type": "string"
//                         },
//                         "city": {
//                             "type": "string"
//                         },
//                         "country": {
//                             "type": "string"
//                         }
//                     }
//                 },
//                 "profiles": {
//                     "type": "array",
//                     "items": {
//                         "type": "object",
//                         "properties": {
//                             "network": {
//                                 "type": "string"
//                             },
//                             "username": {
//                                 "type": "string"
//                             },
//                             "url": {
//                                 "type": "string"
//                             }
//                         },
//                         "required": [
//                             "network",
//                             "username",
//                             "url"
//                         ]
//                     }
//                 }
//             }
//         },
//         "work": {
//             "type": "array",
//             "items": {
//                 "type": "object",
//                 "properties": {
//                     "company": {
//                         "type": "string"
//                     },
//                     "position": {
//                         "type": "string"
//                     },
//                     "website": {
//                         "type": "string"
//                     },
//                     "startDate": {
//                         "type": "string"
//                     },
//                     "endDate": {
//                         "type": "string"
//                     },
//                     "summary": {
//                         "type": "string"
//                     }
//                 }
//             }
//         },
//         "education": {
//             "type": "array",
//             "items": {
//                 "type": "object",
//                 "properties": {
//                     "institution": {
//                         "type": "string"
//                     },
//                     "area": {
//                         "type": "string"
//                     },
//                     "studyType": {
//                         "type": "string"
//                     },
//                     "startDate": {
//                         "type": "string"
//                     },
//                     "endDate": {
//                         "type": "string"
//                     },
//                     "courses": {
//                         "type": "array",
//                         "items": {
//                             "type": "string"
//                         }
//                     }
//                 }
//             }
//         },
//         "skills": {
//             "type": "array",
//             "items": {
//                 "type": "object",
//                 "properties": {
//                     "name": {
//                         "type": "string"
//                     },
//                     "level": {
//                         "type": "string"
//                     },
//                     "keywords": {
//                         "type": "array",
//                         "items": {
//                             "type": "string"
//                         }
//                     }
//                 },
//                 "required": [
//                     "name",
//                     "level",
//                     "keywords"
//                 ]
//             }
//         },
//         "languages": {
//             "type": "array",
//             "items": {
//                 "type": "object",
//                 "properties": {
//                     "language": {
//                         "type": "string"
//                     },
//                     "fluency": {
//                         "type": "string"
//                     }
//                 }
//             }
//         },
//         "interests": {
//             "type": "array",
//             "items": {
//                 "type": "object",
//                 "properties": {
//                     "name": {
//                         "type": "string"
//                     },
//                     "keywords": {
//                         "type": "array",
//                         "items": {
//                             "type": "string"
//                         }
//                     }
//                 }
//             }
//         }
//     }
// });

module.exports = mongoose.model('Resume', ResumeSchema);
