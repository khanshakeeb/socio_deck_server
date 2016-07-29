// config/local_auth.js


//Export local authentication methods
module.exports = function(User){
  
    return {
           
            signup: function(req, email, password, done) {
                 
                // asynchronous
                // User.findOne wont fire unless data is sent back
                process.nextTick(function() {
               
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();

                        // set the user's local credentials
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });    

                });

            },
        login: function(req, email, password, done) { // callback with email and password from our form
         
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err){
                   
                    return done(err);
                }
                    

                // if no user is found, return the message
                if (!user){
                  
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                    

                // if the user is found but the password is wrong
                if (!user.validPassword(password)){
                  
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }
                    
              
                // all is well, return successful user
                return done(null, user);
            });

        }
    
    };
    
}