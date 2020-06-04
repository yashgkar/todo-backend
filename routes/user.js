const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {
    ensureAuthenticated
} = require('../config/auth');

//user model
const User = require('../models/UserData');
const addUser = require('../controller/UserController').addNewUser;
const getName = require('../controller/UserController').getUserName;
//register handle

router.post('/register', ( req, res) => {
    const { name, email, password } = req.body;
    let errors = [];

    if( !name || !email || !password ) {
        res.send( { 'success': false, 'response': 'Invalid request object' } );
    } else {
        //validation passed
        addUser( name, email, password, errors, res );
    }
});

//login handle
router.post( '/login', ( req, res, next ) => {
    passport.authenticate( 'local', function( err, user, info ){
        if( !user ) { 
            res.json( { 'success': false, 'response': info } )
        } else {
            req.logIn( user, function( err ) {
                if ( err ) { return next( err ); }
                return res.redirect('/tasks/');
            });
        }    
      } )( req, res, next ); 
} );

//logout handle
router.get( '/logout', ( req, res, next ) => {
    req.logout();
    req.flash( 'success_msg', 'You are logged out' );
    res.json( {'success': true, 'response': 'Logged out' } );
});

//get user name
router.get( '/getUserName', ensureAuthenticated, async ( req, res ) => {
    const user = req.user._id;
    getName( res, user );
});

module.exports = router;