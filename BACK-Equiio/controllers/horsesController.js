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
                const json = {returnCode: 500, message: 'Failed to create horse'}
                res.status(500).send(json);
            } else {
                const json = {returnCode: 200, message: 'Horse created with success'}
                res.status(200).send(json);
            }
        }
    );
}

exports.updateHorse = function (req, res) {
    Horse.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) {
            const json = {returnCode: 500, message: 'Failed to update horse'}
            res.status(500).send(json);
        } else {
            const json = {returnCode: 200, message: 'Horse updated with success'}
            res.status(200).send(json);
        }
    });
};

exports.deleteHorse = function (req, res) {
    Horse.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            const json = {returnCode: 500, message: 'Failed to delete horse'}
            res.status(500).send(json);
        } else {
            const json = {returnCode: 200, message: 'Horse deleted with success'}
            res.status(200).send(json);
        }
    });
}
