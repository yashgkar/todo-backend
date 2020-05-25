const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {
    ensureAuthenticated
} = require('../config/auth');

//user model
const User = require('../models/UserData');
const addUser = require('../controller/newUser').addNewUser;


router.get('/login', (req, res) => {
    res.send('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

//register handle

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        // res.render('register', {
        //     errors,
        //     name,
        //     email,
        //     password,
        //     password2
        // });
        res.send(errors);
    } else {
        //validation passed
        
        addUser(name, email, password, res);
    }
});





//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/tasks',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

//logout handle
router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login')
});

module.exports = router;



// {
// 	"email": "yashgarudkar@gmail.com",
// 	"password": "yashgkar123"
// }


// {
// 	"Title": "react project",
// 	"Data": "Work harder",
// 	"Status": "active",
// 	"Label":"Food"
// }