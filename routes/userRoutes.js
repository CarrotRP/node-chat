const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/signup', checkNotAuth, userController.user_signup_get);
//2 ways to save stuff to db
// handle user signup
// app.post('/users/signup', async (req, res) => {
//     const user = await User.create({
//         username: req.body.username,
//         password: req.body.password
//     });
//     // console.log(res.status(200).json(user));

//     return res.status(200).json(user);
// }) // no need to use .save()
router.post('/signup', userController.user_signup_post); // need .save()

router.get('/login', checkNotAuth, userController.user_login_get)

router.post('/login', userController.user_login_post);

//prevent user from going back to login page after login
function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) { //if session is valid or user alr logged in go to home('/')
        return res.redirect('/')
    }
    next(); //else go next
}

module.exports = router;