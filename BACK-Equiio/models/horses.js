const mongoose = require("mongoose");

let horseSchema = mongoose.Schema({
    id: {type: String, require: true},
    name: {
        type: String,
        trim: true
    }
}, {
    versionKey: false
});

let Horse = mongoose.model("Horse", horseSchema);

module.exports = Horse;
