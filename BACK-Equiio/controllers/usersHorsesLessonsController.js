const errors = require('../utils/errors');
const UsersHorsesLessons = require('../models/users_horses_lessons');

exports.findAllUHL = function (req, res) {
    UsersHorsesLessons.find(function (err, lessons) {
        if (err) {
            res.send(err);
        }
        res.json(lessons);
    }).populate('user_id', 'horse_id', 'lesson_id');
};

exports.findUHL = function (req, res) {
    UsersHorsesLessons.find({_id: req.params.id}, function (err, lessons) {
        if (err) {
            res.send(err);
        }
        res.json(lessons[0]);
    }).populate('user_id', 'horse_id', 'lesson_id');
};

exports.findAllUHLByUser = function (req, res) {
    UsersHorsesLessons.find({user_id: req.params.id}, function (err, lessons) {
        if (err) {
            res.send(err);
        }
        res.json(lessons);
    }).populate('user_id', 'horse_id', 'lesson_id');
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
                const json = {returnCode: 500, message: "Erreur lors de la création"}
                res.status(500).send(json);
            } else {
                const json = {returnCode: 200, message: 'Créée avec succès'}
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
    UsersHorsesLessons.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            const json = { returnCode: 500, message: 'Erreur lors de la suppression de la leçon' }
            res.status(500).send(json);
        } else {
            const json = { returnCode: 200, message: 'Leçon supprimée avec succès' }
            res.status(200).send(json);
        }
    });
};