//user login and stuff, (l8tr)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const User = mongoose.model('User', userSchema);
module.exports = User;