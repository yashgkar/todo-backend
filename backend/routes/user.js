const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');
require('../config/passport')(passport);
const User = require('../models/UserData');

router.get('/register', (req, res) => {

    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/register', (req, res) => {

    const { name, email, password, confirmPass } = req.body;
    let errors = [];

    if (!name || !email || !password || !confirmPass) {
        errors.push({ msg: 'Please enter all fields' });
    }
    if (password != confirmPass) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (errors.length > 0) {
        res.send(errors);
    }

    else {
        //validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user exists

                    res.send('Email is already registered')
                    errors.push({ msg: 'Email is already registered' });
                    /*res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        confirmPass
                    });*/
                    res.redirect('/login');
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    //hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;

                            //set password to hash
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    res.send('registered!');
                                    req.flash('success_msg', 'You are now register and can now log in');
                                    res.redirect('/login');
                                })
                                .catch(err => console.log(err));
                        })
                    });
                }

            });
    }

});

/*router.get('/login', (req, res) => {
    res.render('studentlogin');
});*/


router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.send('this is dashboard');

});

//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


//logout handle
router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});

module.exports = router;