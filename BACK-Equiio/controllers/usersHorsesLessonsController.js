const UsersHorsesLessons = require('../models/users_horses_lessons');
const lessonController = require("./lessonsController");
const {populate} = require("mongoose");

exports.findAllUHL = function (req, res) {
    UsersHorsesLessons.find(function (err, uhl) {
        if (err) {
            res.send(err);
        } else {
            res.json(uhl);
        }
    }).populate('userId').populate('horseId').populate('lessonId');
};

exports.findUHL = function (req, res) {
    UsersHorsesLessons.find({_id: req.params.id}, function (err, uhl) {
        if (err) {
            res.send(err);
        } else {
            res.json(uhl[0]);
        }
    }).populate('userId').populate('horseId').populate('lessonId');
};

exports.findAllUHLByUser = function (req, res) {
    UsersHorsesLessons.find({user_id: req.params.id}, function (err, uhl) {
        if (err) {
            res.send(err);
        } else {
            res.json(uhl);
        }
    }).populate('horseId').populate({path: 'lessonId', populate: { path: 'teacherId' }});
};

exports.findAllUHLByLesson = function (req, res) {
    UsersHorsesLessons.find({lessonId: req.params.lessonId}, function (err, lessons) {
        if (err) {
            res.send(err);
        } else {
            res.json(lessons);
        }
    }).populate('userId').populate('horseId');
};

exports.createUHL = function (req, res) {
    UsersHorsesLessons.create({
            userId: req.body.userId,
            horseId: req.body.horseId,
            lessonId: req.body.lessonId,
        },
        function (err, lesson) {
            // Check if correct
            if (err) {
                const json = {returnCode: 500, message: "Erreur lors de l'inscription"}
                res.status(500).send(json);
            } else {
                lessonController.addSubscribers(req.body.lessonId, res); // add one to the num of subs of the lesson
                const json = {returnCode: 200, message: 'Inscription à la leçon avec succès'}
                res.status(200).send(json);
            }
        }
    );
};

exports.updateUHL = function (req, res) {
    UsersHorsesLessons.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if(err) {
            const json = { returnCode: 500, message: 'Erreur lors de la mise à jour' }
            res.status(500).send(json);
        } else {
            const json = { returnCode: 200, message: 'Mise à jour avec succès' }
            res.status(200).send(json);
        }
    });
};

exports.deleteUHL = function (req, res) {
    UsersHorsesLessons.findByIdAndDelete(req.params.id, function (err, uhl) {
        if (err) {
            const json = { returnCode: 500, message: 'Erreur lors de la suppression de la leçon' }
            res.status(500).send(json);
        } else {
            lessonController.substractSubscribers(uhl.lessonId, res); // substract one to the num of subs of the lesson
            const json = { returnCode: 200, message: 'Leçon supprimée avec succès' }
            res.status(200).send(json);
        }
    });
};