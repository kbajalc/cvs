var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

app.use(express.static(rootPath + 'cvApp/app-client'));

//get user model
var User = require('./app/models/user.model');
//get resume model
var Resume = require('./app/models/cv.model');
    //db connection
mongoose.connect('mongodb://localhost/testBD');
//config

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//port
var port = process.env.PORT || 8080;

//routes
var router = express.Router();

//do something when a request is sent

//
// router.use(function(req, res, next) {
//     console.log('request');
//     next();
// });
//
// app.get('*', function(req,res){
//   res.sendfile(rootPath +'cvs/app-client/index.html');
//   //__dirname : It will resolve to your project folder.
// });
// router.get('/', function(req, res) {
//   res.sendFile('app-client/index.html');
//     // res.json({
//     //     message: 'working api!'
//     // });
// });



router.route('/users')
    .post(function(req, res) {
        var user = new User();

        user.name = req.body.name;
        user.email =req.body.email;
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
     * START OF RESUMES API
     *****************************************************/

    /*******************************
     * Server restful api
     * route: api/resumes
     * GET all resumes
     * Post new resume
     *******************************/

    //init object model for Resume (**some problems with model Schema  for post new resume)
    //var Resume = require('./models/Resume');

    router.route('/resumes')
        .post(function (req, res) {
            var newCV = new Resume(req.body);
            // newCV.name = req.body.name;
            // newCV.jobTittle = req.body.jobTittle;
            console.log(req.body);
            console.log( req.body);
            console.log(newCV);
            newCV.save(function (err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'Resume saved!'
                });
            });
        })

        .get(function (req, res) {
            Resume.find(function (err, data) {
                if (err)
                    res.send(err);
                res.json(data);
            });
        });

    /*******************************
     * Server restful api find
     * Resumes with id
     * route: api/resumes:id
     * GET  resumes with spec ID
     * PUT  resume with spec ID
     * DELETE resume with spec ID
     *******************************/
    router.route('/resumes/:id')
        .get(function (req, res) {
            Resume.findById(
                req.params.id,
                function (err, data) {
                    if (err)
                        res.send(err);

                    res.json(data);
                });
        })

        .put(function (req, res) {
            Resume.findById(req.params.id, function (err, resume) {
                if (err)
                    res.send(err);
                resume.body = req.body;

                resume.save(function (err) {
                    if (err)
                        res.send(err);
                    res.json({
                        message: 'User updated'
                    });
                });
            });
        })
        .delete(function (req, res) {
            Resume.findById(req.params.id , function (err, data) {
                if (err) { es.send('Error' + err);}
                data.remove();
                res.send({message:"Resume deleted"});
            });
        })
    /*****************************************************
     * END OF RESUMES API
     *****************************************************/





//register routes
//prefixed with api
app.use('/api', router);

//start server
app.listen(port);
console.log('Server on port: ' + port);
