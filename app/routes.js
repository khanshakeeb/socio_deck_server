// app/routes.js

var siteCtrl = require('./controllers/site.js'); //Site controller 
var authCtrl = require('./controllers/auth.js'); //Auth controller 

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    
    //Attach Site Controller to Route     
    app.get('/', siteCtrl.index);

    app.get('/login', authCtrl.login);

    // process the login form
    // app.post('/login', do all our passport stuff here);

   

    app.get('/signup', authCtrl.signup);

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

   

     app.get('/logout', authCtrl.logout);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}