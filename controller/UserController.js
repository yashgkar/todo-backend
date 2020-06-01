const User = require('../models/UserData');
const bcrypt = require('bcryptjs');

module.exports = {
    addNewUser: ( name, email, password, errors, res ) => {
        User.findOne( { email: email } )
        .then( user => {
            if( user ) {
                res.status( 400 ).json( { 'success': false, 'response': 'Email already registered' } );
            } else {
                const newUser = new User({
                    name: name,
                    email,
                    password
                });
                //hash password
                bcrypt.genSalt( 10, ( err, salt ) => {
                    bcrypt.hash( newUser.password, salt, ( err, hash ) => {
                        if ( err ) throw err;
                        //set password to hash
                        newUser.password = hash;
                        newUser.save()
                        .then( user => {
                            res.status( 200 ).json( { 'success': true, 'response': 'Registered successfully' } );
                        }).catch( err => res.status( 500 ).json( err ) );
                    })
                });
            }
        });
    }
}