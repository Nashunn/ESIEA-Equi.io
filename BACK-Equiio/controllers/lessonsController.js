const errors = require('../utils/errors');
const Lesson = require("../models/lessons");
const UserHorseLesson = require('../models/users_horses_lessons');

exports.findAllLessons = function (req, res) {
    Lesson.find({date: {$gte: new Date()}}, function (err, lessons) {
        if (err) {
            res.send(err);
        } else {
            res.json(lessons);
        }
    }).populate('teacherId');
};

exports.findLesson = function (req, res) {
    Lesson.find({_id: req.params.id, date: {$gte: new Date()}}, function (err, lessons) {
        if (err) {
            res.send(err);
        } else {
            res.json(lessons[0]);
        }
    }).populate('teacherId');
};

exports.findAllLessonsByTeacher = function (req, res) {
    Lesson.find({teacherId: req.params.teacherId, date: {$gte: new Date()}}, function (err, lessons) {
        if (err) {
            const json = {returnCode: 500, message: "Erreur lors de la récupération des leçons"}
            res.status(500).send(json);
        } else {
            res.json(lessons);
        }
    }).populate('teacherId');
}

exports.createLesson = function (req, res) {
    Lesson.create({
        name: req.body.name,
        date: req.body.date,
        level: req.body.level,
        numRiders: req.body.numRiders,
        numSubs: req.body.numSubs,
        teacherId: req.body.teacherId,
    },
    function (err, lesson) {
        // Check if correct
        if (err) {
            const json = {returnCode: 500, message: "Erreur lors de la création de la leçon"}
            res.status(500).send(json);
        } else {
            const json = {returnCode: 200, message: 'Leçon créée avec succès'}
            res.status(200).send(json);
        }
    }
    );
};

exports.updateLesson = function (req, res) {
    Lesson.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if(err) {
            const json = { returnCode: 500, message: 'Erreur lors de la mise à jour de la leçon' }
            res.status(500).send(json);
        } else {
            const json = { returnCode: 200, message: 'Leçon mise à jour avec succès' }
            res.status(200).send(json);
        }
    });
};

exports.addSubscribers = function (lessonId, res) {
    Lesson.findByIdAndUpdate(lessonId, { $inc :{ numSubs: 1 } }, {new: true}, function (err) {})
}

exports.substractSubscribers = function (lessonId, res) {
    Lesson.findByIdAndUpdate(lessonId, { $inc :{ numSubs: -1 } }, {new: true}, function (err) {})
}

exports.deleteLesson = function (req, res) {
    Lesson.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            const json = { returnCode: 500, message: 'Erreur lors de la suppression de la leçon' }
            res.status(500).send(json);
        } else {
            const json = { returnCode: 200, message: 'Leçon supprimée avec succès' }
            res.status(200).send(json);
        }
    });
};