var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

app.use(express.static(rootPath + 'cvs/app-client'));
//passport routes
var authenticate = require('./app/routes/routes.js')(passport);
//get user model
var User = require('./app/models/user.model');
//get resume model
var Resume = require('./app/models/cv.model');
//db connection
mongoose.connect('mongodb://localhost/testBD');
//config
app.use(logger('dev'));
app.use(session({
    secret: 'itgmarulez'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authenticate);

//port
var port = process.env.PORT || 8080;

//routes
var router = express.Router();


//register and send index.html
app.get('/', function(req, res) {
    res.sendfile(rootPath + 'cvs/app-client/index.html');

});

/////// START passport routes
function isAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/login');
};


////////  api passport routes

router.get('/success', function(req, res) {
    res.send({
        state: 'success',
        user: req.user ? req.user : null
    });
});

//sends failure login state back to angular
router.get('/failure', function(req, res) {
    res.send({
        state: 'failure',
        user: null,
        message: "Invalid username or password"
    });
});

//log in
router.post('/login', passport.authenticate('login', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
}));

//sign up
router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
}));

//log out
router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});






//router.use('/', isAuthenticated);
//////// END passport routes

router.route('/users')
    .post(function(req, res) {
        var user = new User();

        user.name = req.body.name;
        user.email = req.body.email;
        //user.password = req.body.password;
        user.password = user.setPassword(req.body.password);
        //user.hash = req.body.hash;
        //  user.salt = req.body.salt;

        user.save(function(err) {
            if (err)
                res.send(err);

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



//// Initialize Passport
var initPassport = require('./app/config/passport.js');
initPassport(passport);



//register routes
//prefixed with auth
app.use('/auth', router);

//start server
app.listen(port);
console.log('Server on port: ' + port);
