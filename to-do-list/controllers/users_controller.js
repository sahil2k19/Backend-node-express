const User = require('../models/users');

let context = {
    title: 'user',
}
module.exports.home = function (req, res) {
    return res.render('user', context);
}
module.exports.profile = function (req, res) {
    return res.render('profile', context);
}

//render sign-up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "codeial | signUp",
    })
}


//render sign-in page 
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "codeial | signIn",
    })
}

// // get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return }

                return res.redirect('/user/sign-in');
            })
        } else {
            return res.redirect('back');
        }

    });
}

// sign in and create session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}


