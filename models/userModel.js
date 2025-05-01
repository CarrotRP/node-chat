//user login and stuff, (l8tr)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose')

//username login for now
const userSchema = new Schema({
    // email: {
    //     type: String,
    //     required: true
    // },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema);
module.exports = User;