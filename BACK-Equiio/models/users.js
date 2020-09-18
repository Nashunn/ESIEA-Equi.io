const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    id: {type: String, require: true},
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    mail: {
        type: String,
        trim: true,
        unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "user",
        required: true
    },
}, {
    versionKey: false
});

let User = mongoose.model("User", userSchema);

module.exports = User;
