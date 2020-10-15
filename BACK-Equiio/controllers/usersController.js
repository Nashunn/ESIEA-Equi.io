const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const errors = require('../utils/errors');
const User = require("../models/users");
const config = require("../config/config")

exports.createUser = function (req, res) {
    const hashedPwd = bcrypt.hashSync(req.body.password, 8);

    User.create(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mail: req.body.mail,
            phone: req.body.phone,
            licence: req.body.licence,
            password: hashedPwd,
            type: req.body.type,
        },
        function (err, user) {
            // Check if correct
            if (err) return errors.checkErrors("user", res, err);
            // create a token
            let token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(201).send({ auth: true, id: user._id, token: token });
        }
    );
}

exports.findAllUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

exports.getUser = function (req, res) {
    User.find({_id: req.params.id}, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user[0]);
    });
};

exports.updateUser = function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) {
            const json = {returnCode: 500, message: 'Failed to update user'}
            res.status(500).send(json);
        } else {
            const json = {returnCode: 200, message: 'User updated with success'}
            res.status(200).send(json);
        }
    });
};

exports.deleteUser = function (req, res) {
    console.log(req.params.id)
    User.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            const json = {returnCode: 500, message: 'Failed to delete user'}
            res.status(500).send(json);
        } else {
            const json = {returnCode: 200, message: 'User deleted with success'}
            res.status(200).send(json);
        }
    });
};

exports.login = function(req, res) {
    User.findOne({mail: req.body.mail}, function(err, user) {
        if (err) {
            const json = { message: 'Server error' }
            res.send(err, json);
        }
        else if (!user) {
            const json = { message: 'Failed to log in' }
            res.send(401, json);
        }
        else {
            // Todo : Check if password is valid


            // Assign token
            let token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            const json = { auth: true, id: user._id, token: token }
            res.send(200, json);
        }
    })
}