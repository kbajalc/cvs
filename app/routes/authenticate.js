var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    //sends successful login state back to angular
    router.get('/success', function(req, res) {
        res.send({
            state: 'success',
            user: req.user ? req.user : null
        });
    });

    //sends failure login state back to angular
    router.get('/failure', function(req, res) {
      // console.log("--->"+req.flash('failUsername'));
        res.send({
            state: 'failure',
            user: null,
            message: req.flash('failLogin')
        });
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
        failureFlash: true
    }));

    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
        failureFlash: true
    }));

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



    return router;

}
