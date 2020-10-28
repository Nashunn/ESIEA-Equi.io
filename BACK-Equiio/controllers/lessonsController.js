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
    Lesson.create({
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
};

exports.updateLesson = function (req, res) {
    Lesson.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if(err) {
            const json = { returnCode: 500, message: 'Failed to update lesson' }
            res.status(500).send(json);
        } else {
            const json = { returnCode: 200, message: 'Lesson updated with success' }
            res.status(200).send(json);
        }
    });
};

exports.deleteLesson = function (req, res) {
    Lesson.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            const json = { returnCode: 500, message: 'Failed to delete lesson' }
            res.status(500).send(json);
        } else {
            const json = { returnCode: 200, message: 'Lesson deleted with success' }
            res.status(200).send(json);
        }
    });
};