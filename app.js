const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

//for pw hashing
const bcrypt = require('bcrypt');

const User = require('./models/userModel')

const app = express();

//TODO: add port, username, pw as .env
const dbURI = "mongodb+srv://"+process.env.name+":"+process.env.password+"@node-chatter.nx6rqxd.mongodb.net/node-chatter?retryWrites=true&w=majority&appName=node-chatter"
mongoose.connect(dbURI)
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

//set engine to ejs for views
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })) //for reading form
app.use(session({
    secret: process.env.session_secret, //key to encrypt information
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
        .then(async data => {
            if(!data){return done(null, false, { message: 'Incorrect username or password' })}
            if(await bcrypt.compare(password, data.password) == false){
                return done(null, false);
            } return done(null, data);
        //     async (err, user) => {
        //     if(err){return done(err)}
        //     if(!data){return done(null, false, { message: 'Incorrect username or password' })}
        //     if(await !bcrypt.compare(password, user.password)){
        //         return done(null, false);
        //     } return done(null, data);
        // } 
        console.log(data);
        
    })
}))
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
     return done(null, User.findById(id))
})

//public folder
app.use(express.static('public'));

//middleware here
// app.post('/chats/create', ())

//routes
app.get('/', (req, res) => {
    res.render('home');
})
app.get('/users/signup', (req, res) => {
    res.render('signup');
})
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
app.post('/users/signup', async (req, res) => {
    try{
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
    } catch{
        res.redirect('/users/signup');
    }
}); // need .save()

app.get('/users/login', (req, res) => {
    res.render('login');
})
// app.post('/users/login', passport.authenticate('local', { failureRedirect: '/users/login', failureMessage: true}), (req, res) => {
//     res.redirect('/secret');    
// })
app.post('/users/login', passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/',
}))

//testing user islogged in
app.get('/secret', (req, res) => {
    res.render('secret');
})

app.get('/chats', (req, res) => {
    res.redirect('/');
})

app.use((req, res) => {
    res.render('error');
})