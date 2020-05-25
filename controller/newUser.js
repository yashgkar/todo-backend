const User = require('../models/UserData');
const bcrypt = require('bcryptjs');

module.exports = {
    addNewUser: (name, email, password, res) => {
        let errors = [];
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user exists
                    errors.push({ msg: 'Email is already registered' });
                    // res.render('register', {
                    //     errors,
                    //     name,
                    //     email,
                    //     password,
                    //     password2
                    // });
                    res.send('email already registered');
                } else {
                    const newUser = new User({
                        name: name,
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
                                    // req.flash('success_msg','You are now register and can now log in');
                                    // res.redirect('/login');
                                    res.send('registered!!!');
                                })
                                .catch(err => console.log(err));
                        })
                    });
                }

            });
    }
}