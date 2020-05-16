module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please login to view this source');
        //res.redirect('/login');
        res.send('login to view source');
    }
};