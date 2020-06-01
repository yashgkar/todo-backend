const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();
require('./config/passport')(passport);

const app = express();

//connect to mongo
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((objRequest, objResponse, next) => {
    objResponse.locals.success_msg = objRequest.flash('success_msg');
    objResponse.locals.error_msg = objRequest.flash('error_msg');
    objResponse.locals.error = objRequest.flash('error');
    next();
});

//routes
app.use('/', require('./routes/user'));
app.use('/', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));