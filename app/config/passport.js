var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport) {

    //serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:', user.username);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:', user.username);
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {

            User.findOne({
                    'username': username
                },
                function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    // if username does not exist
                    if (!user) {
                        return done(null, false, req.flash('failLogin', " The username: '" + username + "' doesn't exist"));
                    }
                    // wrong password
                    if (!isValidPassword(user, password)) {
                      return done(null, false, req.flash('failLogin', "The password is incorrect"));
                    }
                    return done(null, user);
                }
            );
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            User.findOne({
                'username': username
            }, function(err, user) {
                if (err) {
                    // console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                if (user) {
                    // console.log('User already exists with username: ' + username);
                    return done(null, false, req.flash('failLogin', "User already exists with username: " + username));
                } else {
                    if (password.length < 3) {
                        return done(null, false);
                    } else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = createHash(password);
                        // save user
                        newUser.save(function(err) {
                            if (err) {
                                // console.log('Error in Saving user: ' + err);
                                throw err;
                            }
                            // console.log(newUser.username + ' Registration succesful');
                            return done(null, newUser);
                        });
                    }
                }
            });
        }));

    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
