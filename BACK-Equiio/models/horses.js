const mongoose = require("mongoose");

let horseSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    height: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    versionKey: false
});

// Duplicate the ID field.
horseSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
horseSchema.set('toJSON', {
    virtuals: true
});

let Horse = mongoose.model("Horse", horseSchema);

module.exports = Horse;
