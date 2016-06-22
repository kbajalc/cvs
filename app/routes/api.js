var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Resume = mongoose.model('Resume');
//var Resume = require('./app/models/cv.model');
//
function isAuthenticated(req, res, next) {

    //allow all get request methods
    if (req.method === "GET") {
        return next();
    }
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/login');
};

//Authentication middleware
router.use('/users', isAuthenticated);
router.use('/resumes', isAuthenticated);

router.route('/users')
    .post(function(req, res) {
        var user = new User();

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = user.setPassword(req.body.password);


        user.save(function(err) {
            if (err)
                res.send(500, err);

            res.json({
                message: 'User created!'
            });
        });
    })


.get(function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
});

router.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(
            req.params.user_id,
            function(err, user) {
                if (err)
                    res.send(err);

                res.json(user);
            });
    })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);

            user.name = req.body.name;

            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'User updated'
                });
            });
        });
    })
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({
                message: 'Deleted user'
            });
        });
    });



/*****************************************************
 * START OF RESUMES api
 *****************************************************/

/*******************************
 * Server restful api
 * route: auth/resumes
 * GET all resumes
 * Post new resume
 *******************************/

//init object model for Resume (**some problems with model Schema  for post new resume)
//var Resume = require('./models/Resume');

router.route('/resumes')
    .post(function(req, res) {
        var newCV = new Resume(req.body);
        // newCV.name = req.body.name;
        // newCV.jobTittle = req.body.jobTittle;
        console.log(req.body);
        console.log(req.body);
        console.log(newCV);
        newCV.save(function(err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Resume saved!'
            });
        });
    })

.get(function(req, res) {
    Resume.find(function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});

/*******************************
 * Server restful api find
 * Resumes with id
 * route: auth/resumes:id
 * GET  resumes with spec ID
 * PUT  resume with spec ID
 * DELETE resume with spec ID
 *******************************/
router.route('/resumes/:id')
    .get(function(req, res) {
        Resume.findById(
            req.params.id,
            function(err, data) {
                if (err)
                    res.send(err);

                res.json(data);
            });
    })

.put(function(req, res) {
        Resume.findById(req.params.id, function(err, resume) {
            if (err)
                res.send(err);
            resume.body = req.body;

            resume.save(function(err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'User updated'
                });
            });
        });
    })
    .delete(function(req, res) {
        Resume.findById(req.params.id, function(err, data) {
            if (err) {
                es.send('Error' + err);
            }
            data.remove();
            res.send({
                message: "Resume deleted"
            });
        });
    })
    /*****************************************************
     * END OF RESUMES api
     *****************************************************/

     module.exports = router;
