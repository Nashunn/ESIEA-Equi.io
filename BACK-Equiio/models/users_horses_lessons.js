const mongoose = require("mongoose");
const Schema = require("mongoose/lib/schema");

let UsersHorsesLessonsSchema = mongoose.Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    horseId: [{ type: Schema.Types.ObjectId, ref: 'Horse' }],
    lessonId: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
});

// Duplicate the ID field.
UsersHorsesLessonsSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
UsersHorsesLessonsSchema.set('toJSON', {
    virtuals: true
});

let UsersHorsesLessons = mongoose.model("UsersHorsesLessons", UsersHorsesLessonsSchema);

module.exports = UsersHorsesLessons;
