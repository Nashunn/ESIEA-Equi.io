const errors = require('../utils/errors');
const Horse = require("../models/horses");

exports.findAllHorses = function (req, res) {
    Horse.find(function (err, horses) {
        if (err) {
            res.send(err);
        }
        res.json(horses);
    });
};

exports.createHorse = function (req, res) {
    Horse.create(
        {
            name: req.body.name,
            height: req.body.height,
            description: req.body.description
        },
        function (err, horse) {
            if (err) {
                const json = {returnCode: 500, message: 'Erreur lors de la création du cheval'}
                res.status(500).send(json);
            } else {
                const json = {returnCode: 200, message: 'Cheval créé avec succès'}
                res.status(200).send(json);
            }
        }
    );
}

exports.updateHorse = function (req, res) {
    Horse.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) {
            const json = {returnCode: 500, message: 'Erreur lors de la modification du cheval'}
            res.status(500).send(json);
        } else {
            const json = {returnCode: 200, message: 'Cheval modifié avec succès'}
            res.status(200).send(json);
        }
    });
};

exports.deleteHorse = function (req, res) {
    Horse.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            const json = {returnCode: 500, message: 'Erreur lors de la suppression du cheval'}
            res.status(500).send(json);
        } else {
            const json = {returnCode: 200, message: 'Cheval supprimé avec succès'}
            res.status(200).send(json);
        }
    });
}
