const errors = require('../utils/errors');
const User = require("../models/users");

exports.findAllUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

exports.createUser = function (req, res) {
    User.create(
        {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            mail: req.body.mail,
            phone: req.body.phone,
            password: req.body.password,
            type: req.body.type
        },
        function (err, user) {
            // Check if correct
            if (err) return errors.checkErrors("user", res, err);

            res.status(201).send();
        }
    );
}
