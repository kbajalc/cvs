var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
//initalize mongoose schemas
require('./app/models/user.model');
require('./app/models/cv.model');
var index = require('./app/routes/index');
var api = require('./app/routes/api');
var authenticate = require('./app/routes/authenticate.js')(passport);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testBD');
//port
var port = process.env.PORT || 8080;
var app = express();

var rootPath = path.normalize(__dirname + '/../');

//config
app.use(logger('dev'));
app.use(session({secret: 'itgmarulez'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(rootPath + 'cvs/app-client'));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./app/config/passport.js');
initPassport(passport);

app.use('/', index);
app.use('/auth', authenticate);
app.use('/api', api);

app.get('/*', function(req, res) {
    res.sendfile(rootPath + 'cvs/app-client/index.html');
});

//Start server
app.listen(port);
console.log('Server on port: ' + port);
