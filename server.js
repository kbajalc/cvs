var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

app.use(express.static(rootPath + 'cvApp/app-client'));

//get user model
var User = require('./app/models/user.model')
    //db connection
mongoose.connect('mongodb://localhost/users');
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

app.get('*', function(req,res){
  res.sendfile(rootPath +'cvApp/app-client/index.html');
  //__dirname : It will resolve to your project folder.
});
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




//register routes
//prefixed with api
app.use('/api', router);

//start server
app.listen(port);
console.log('Server on port: ' + port);
