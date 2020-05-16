module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated('local')) {
            return next();
        }
        req.flash('error_msg', 'Please login to view this source');
        res.redirect('/login');
    }
};