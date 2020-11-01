const mongoose = require("mongoose");
const Schema = require("mongoose/lib/schema");

let lessonSchema = mongoose.Schema({
    id: {type: String, require: true},
    name: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        trim: true,
        required: true
    },
    numRiders : {
        type: Number,
        trim: true,
        required: true
    },
    level: {
        type: Number,
        trim: true,
        required: true
    },
    teacherId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    versionKey: false
});

// Ensure virtual fields are serialised.
lessonSchema.set('toJSON', {
    virtuals: true
});

let Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
