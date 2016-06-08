//Schema for resumes
var mongoose = require('mongoose');

var ResumeSchema = new mongoose.Schema({

    basics: {
        firstName: String,
        lastName: String
        jobTittle: String,
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
        level: String
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
        level: String
    }],
    languages: [{
        name: String,
        level: String
    }],
    createDate: {
        type: Date,
        default: Date.now
    }

    });

module.exports = mongoose.model('Resume', ResumeSchema);
