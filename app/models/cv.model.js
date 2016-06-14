//Schema for resumes
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResumeSchema = new Schema({

    basics: {
        firstName: String,
        lastName: String,
        jobTitle: String,
        picture: String,
        summary: String
    },
    contacts: {
        email: String,
        phone: String,
        city: String,
        country: String,
        website: String,
        social: [{
            network: String
        }]
    },
    profSkills: [{
        name: String,
        level: Number
    }],
    work: [{
        company: String,
        position: String,
        website: String,
        startDate: String,
        endDate: String,
        summary: String
    }],
    education: [{
        institution: String,
        area: String,
        studyType: String,
        startDate: String,
        endDate: String,
        summary: String
    }],
    skills: [{
        name: String,
        level: Number
    }],
    languages: [{
        name: String,
        level: Number
    }],
    createDate: {
        type: Date,
        default: Date.now
    },
    userID: {
        id: String
    }
});


var Resume = mongoose.model('Resume', ResumeSchema);
module.exports = Resume;