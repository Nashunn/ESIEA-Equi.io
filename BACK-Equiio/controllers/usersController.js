const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const errors = require('../utils/errors');
const User = require("../models/users");
const config = require("../config/config")

function generateToken(userId, userRole) {
    // Assign token
    return jwt.sign({id: userId, role: userRole}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
}

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
            role: req.body.role,
        },
        function (err, user) {
            // Check if correct
            if (err) return errors.checkErrors("user", res, err);
            // create a token
            const token = generateToken(user._id, user.type);
            res.status(201).send({ token: token });
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
    User.find({_id: req.params.id}, function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users[0]);
    });
};

exports.updateUser = function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) {
            const json = { returnCode: 500, message: 'Failed to update user' }
            res.status(500).send(json);
        } else {
            const json = { returnCode: 200, message: 'User updated with success' }
            res.status(200).send(json);
        }
    });
};

exports.deleteUser = function (req, res) {
    User.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            const json = { returnCode: 500, message: 'Failed to delete user' }
            res.status(500).send(json);
        } else {
            const json = { returnCode: 200, message: 'User deleted with success' }
            res.status(200).send(json);
        }
    });
};

exports.login = function(req, res) {
    User.findOne({mail: req.body.mail}, function(err, user) {
        // error
        if (err) {
            const json = { returnCode: 500,  message: 'Erreur serveur' }
            res.send(err, json);
        }
        // user not found
        else if (!user) {
            const json = { returnCode: 401, message: 'Email ou Mot de passe incorrect' }
            res.status(401).send(json);
        }
        else {
            let pwdsMatches = bcrypt.compareSync(req.body.password, user.password);

            // Check if password is valid
            if (pwdsMatches) {
                // Assign token
                let token = generateToken(user._id, user.type);
                const json = { token: token }
                res.status(200).send(json);
            }
            else { // error
                const json = { returnCode: 401, message: 'Email ou Mot de passe incorrect' }
                res.status(401).send(json);
            }
        }
    })
}