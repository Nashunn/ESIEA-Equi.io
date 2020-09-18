const mongoose = require("mongoose");

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
    level: {
        type: Number,
        trim: true,
        required: true
    },
    teacher_id: {
        type: String,
        trim: true
    }
}, {
    versionKey: false
});

let Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
