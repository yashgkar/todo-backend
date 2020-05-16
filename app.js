const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();


//db config
const db = require('./config/keys').MongoURI;

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//body parser
app.use(express.urlencoded({
    extended: false
}));

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

//parse json data
app.use(express.json());
//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


app.use('/', require('./routes/user'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));