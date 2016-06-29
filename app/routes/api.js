var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Resume = mongoose.model('Resume');
var multer = require('multer');
var imageName;

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

//multer config
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './app-client/img/') //where images are stored
    },
    filename: function(req, file, cb) {
        var userID = req.params.userID;
        var timestamp = Date.now();
        //timestamp+userID included in image name
        imageName = timestamp + '-' + req.params.userID + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];

        User.findById(req.params.userID, function(err, user) {
            if (err)
                console.error(err);

            user.imgUrl = imageName;

            user.save(function(err) {
                if (err)
                    console.error(err);

                console.error('Image path for user updated');
            });
        })
        cb(null, imageName);


    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');



//Authentication middleware
router.use('/users', isAuthenticated);
router.use('/resumes', isAuthenticated);
router.use('/upload', isAuthenticated);
router.use('/publish', isAuthenticated)
router.use('/unpublish', isAuthenticated)
router.use('/allPublishResumes', isAuthenticated);
router.use('/currentUserCvID', isAuthenticated);

//User api
//this route is not used, creating user is dictated by passport api
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

router.route('/users/:userID')
    .get(function(req, res) {
        User.findById(
            req.params.userID,
            function(err, user) {
                if (err)
                    res.send(err);

                res.json(user);
            });
    })
    .put(function(req, res) {
        User.findById(req.params.userID, function(err, user) {
            if (err)
                res.send(err);

            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;


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
            _id: req.params.userID
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
            console.log('req.body', req.body);
            console.log('req.params', req.params);
            if (err)
                res.send(err);
            console.log('resume:', resume);
            resume.status.value = 'draft';
            // resume.body = req.body;
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

    router.route('/publish/:id')
        .put(function(req, res) {
            var query = {
                'userID.id': req.body.userID.id,
                'status.value': 'publish'
            }
            Resume.find(query, function(err, resume) {
                if (err)
                    res.send(err);


                    if (resume.length > 0) {
                        resume[0].status.value = 'draft'
                        resume[0].save(function(err) {
                            if (err)
                                res.send(err)
                            res.json({
                                message: 'Resume draft'
                            })
                        })
                }
                Resume.findById(req.params.id, function(err, resume1) {
                    if (err)
                        res.send(err)
                    resume1.status.value = 'publish'
                    resume1.save(function(err) {
                        if (err)
                            res.send(err)
                        res.json({
                            message: 'Resume published'
                        })
                    })
                })
            })
        })

    /*******************************
     * Server restful api find
     * Resumes with id
     * route: api/unpublish:id
     * PUT  resume with spec ID

     *******************************/

    router.route('/unpublish/:userID')
        .put(function(req, res) {
            var query = {
                'userID.id': req.params.userID,
                'status.value': 'publish'
            }
            Resume.find(query, function(err, resume) {
                if (err)
                    res.send(err);
                if (resume) {
                    query = {
                        'userID.id': req.params.userID,
                        'status.value': 'latest'
                    }
                    Resume.find(query, function(err, resume1) {
                        if (err)
                            res.send(err);

                        if (resume1.length > 0) {
                            resume[0].status.value = 'unpublished'
                        } else {
                            resume[0].status.value = 'latest'
                        }
                        resume[0].save(function(err) {
                            if (err)
                                res.send(err)
                            res.json({
                                message: 'Resume unpublished'
                            })
                        })
                    })
                }
            })
        });

router.route('/allPublishResumes/:userID')
    .get(function(req, res) {
        var query = {
            'userID.id': {
                '$ne': req.params.userID
            },
            'status.value': 'publish'
        }
        Resume.find(query,
            function(err, data) {
                if (err) {
                    res.send(err);
                    console.log("errorr" + err);
                }
                res.send(data);
            }
        )
    });
router.route('/currentUserCvID/:ID')
    .get(function(req, res) {
        var query = {
            'userID.id': req.params.ID,
            'status.value': 'latest'
        }
        Resume.find(query,
            function(err, data) {
                if (data.length == 0) {
                    query = {
                        'userID.id': req.params.ID,
                        'status.value': 'publish'
                    }
                    Resume.find(query,
                        function(err, data) {
                            if (err) {
                                console.log(err);
                            }
                            res.send(data);
                        }
                    )
                } else {
                    res.send(data);
                }
            }
        )
    });


//Upload api
router.route('/upload/:userID')
    .post(function(req, res) {
        upload(req, res, function(err) {
            if (err) {
                res.json({
                    errorCode: 1,
                    errDesc: err
                });
                return;
            }

            Resume.findOneAndUpdate({
                    'userID.id': req.params.userID
                }, {
                    $set: {
                        imgUrl: imageName
                    }
                }, {
                    new: true
                },

                function(err, doc) {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }

                    console.log(doc);
                });

            res.json({
                errorCode: 0,
                errDesc: null

            });
        })
    });


module.exports = router;
