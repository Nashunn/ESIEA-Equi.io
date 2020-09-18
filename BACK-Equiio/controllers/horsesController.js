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
            name: req.body.name
        },
        function (err, horse) {
            // Check if correct
            if (err) return errors.checkErrors("horse", res, err);

            res.status(201).send();
        }
    );
}
