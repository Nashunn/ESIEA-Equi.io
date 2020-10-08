const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
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

// Duplicate the ID field.
userSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

let User = mongoose.model("User", userSchema);

module.exports = User;
