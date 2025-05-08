const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

//for pw hashing
const bcrypt = require('bcrypt');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const User = require('./models/userModel')
const Chat = require('./models/chatModel');

const app = express();

//TODO: add port, username, pw as .env
const dbURI = "mongodb+srv://" + process.env.name + ":" + process.env.password + "@node-chatter.nx6rqxd.mongodb.net/node-chatter?retryWrites=true&w=majority&appName=node-chatter"
mongoose.connect(dbURI)
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

//set engine to ejs for views
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })) //for reading form

app.use(session({
    secret: process.env.session_secret, //key to encrypt information
    resave: false, //resave = save data again if nth change? false
    saveUninitialized: false, //saveUninitialized = save empty data if no value? false
}))
app.use(passport.initialize()); //init passport
app.use(passport.session()); // use/work with the .use session(express-session)

//setup username, pw login
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
        .then(async data => {
            if (!data) { return done(null, false, { message: 'Incorrect username' }) } //either didnt find any username, or incorrect username
            if (await bcrypt.compare(password, data.password) == false) {
                return done(null, false); //wrong pw
            } return done(null, data); //correct pw
        })
}))
passport.serializeUser((user, done) => done(null, user.id)); //for storing user id for lookup and session
passport.deserializeUser((id, done) => {
    // return done(null, User.findById(id)) //this wont work cuz it(User.findById(id)) returns a fucking promise, (-1 hours 🗿)
    User.findById(id)
        .then(result => done(null, result))
        .catch(err => console.log(err))
}) //looking up data with the stored id

//public folder for img and stuff
app.use(express.static('public'));

//routes
app.get('/', checkAuth, (req, res) => {
    Chat.find()
        .then(result => res.render('home', { name: req.user.username, chats: result, uid: req.user._id.toString()}));
    // res.render('home', { name: req.user.username });
})

//user routes
app.use('/users', userRoutes);
app.use('/chats', chatRoutes);

app.post('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err) }; //next(err) go straight to the middleware(use) with err handler, but i dont have one
        //so it just go to the middleware with the render('error');
        res.redirect('/users/login');
    })
})
app.get('/createM', (req, res) => {
    const message = Chat.findOneAndUpdate(
        { ChatName: "Le Chat"},
        { $set: { messages: [
            {
                messager: "68139350f2914273380ca569",
                message: "hello"
            },
            {
                messager: "6816137dccad0626722a6984",
                message: "hello dawg"
            }
        ]}},
    ).then(result => res.json(result));
    // .then(result => res.send(result));
    // message.save()
    //     .then(result => res.send(result));
    
    // res.render('login');
})

//check if user is logged in(have a session), function used in app.get('/')
//to prevent access if not logged in
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) { //isAuthenticated comes with passport package
        return next();
    }
    res.redirect('/users/login');
}

app.use((req, res) => {
    res.status(404).render('error');
})