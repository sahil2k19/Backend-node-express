const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');


// AUTHENTICATION USING PASSPORT

// passport.user(new localStrategy({usernameField:" "}),function()) -----> demo of below code

passport.use(new localStrategy({
    usernameField: 'email', //we make email unique
},
    function (email, password, done) {

        // find a user and eshtablish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user -> Passport');
                return done(err);
            }
            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    });
});

module.exports = passport;