const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const passport = require('passport');

const user_signup_get = (req, res) => {
    res.render('signup');
};
const user_signup_post = async (req, res) => {
    try {
        const saltRounds = 10; //how secure it will be..
        const hashedPw = await bcrypt.hash(req.body.password, saltRounds);
        const user = new User({
            username: req.body.username,
            password: hashedPw,
        });
        user.save()
            .then((result) => {
                res.redirect('/users/login')
            }).catch((err) => console.log(err))
    } catch {
        res.redirect('/users/signup');
    }
}

const user_login_get = (req, res) => {
    res.render('login');
};

const user_login_post = passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/',
});

module.exports = {
    user_signup_get,
    user_signup_post,
    user_login_get,
    user_login_post,
}