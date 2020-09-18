const errors = require('../utils/errors');
const Lesson = require("../models/lessons");

exports.findAllLessons = function (req, res) {
    Lesson.find(function (err, lessons) {
        if (err) {
            res.send(err);
        }
        res.json(lessons);
    });
};

exports.createLesson = function (req, res) {
    Lesson.create(
        {
            name: req.body.name,
            date: req.body.date,
            level: req.body.level,
            teacher_id: req.body.teacher_id
        },
        function (err, lesson) {
            // Check if correct
            if (err) return errors.checkErrors("lesson", res, err);

            res.status(201).send();
        }
    );
}
