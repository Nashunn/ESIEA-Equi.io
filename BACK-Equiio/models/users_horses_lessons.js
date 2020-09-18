const mongoose = require("mongoose");

let UsersHorsesLessonsSchema = mongoose.Schema({
    user_id: {
        type: String,
        trim: true
    },
    horse_id: {
        type: String,
        trim: true
    },
    lesson_id: {
        type: String,
        trim: true
    },
});

let UsersHorsesLessons = mongoose.model("UsersHorsesLessons", UsersHorsesLessonsSchema);

module.exports = UsersHorsesLessons;
