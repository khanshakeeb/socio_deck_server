var auth = {
    login: function(req, res) {
    
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    },
    signup:  function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    },
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};

module.exports = auth;