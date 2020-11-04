const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const errors = require('../utils/errors');
const User = require("../models/users");
const Roles = require("../models/roles");
const config = require("../config/config")

function generateToken(userId, userRole) {
    // Assign token
    return jwt.sign({id: userId, role: userRole}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
}

exports.registerUser = function (req, res) {
    User.findOne({'$or': [{mail: req.body.mail}, {phone: req.body.mail}]}, function (err, user) {
        // Check if already exists
        if (err) {
            const json = {returnCode: 500, message: 'Erreur serveur'}
            res.send(err, json);
        } else if (user) {
            const json = {returnCode: 409, message: "Erreur : un utilisateur avec cet email/téléphone existe déjà"}
            res.status(200).send(json);
        } else if (!user) {
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
                    const token = generateToken(user._id, user.role);
                    res.status(201).send({token: token});
                }
            );
        }
    })
}

exports.createUser = function (req, res) {
    User.findOne({mail: req.body.mail}, function (err, user) {
        // Check if already exists
        if (err) {
            const json = {returnCode: 500, message: 'Erreur serveur'}
            res.send(err, json);
        } else if (user) {
            const json = {returnCode: 409, message: "Erreur : un utilisateur avec cet email/téléphone existe déjà"}
            res.status(200).send(json);
        } else if (!user) {
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
                    if (err) {
                        const json = {returnCode: 500, message: "Erreur lors de la création de l'utilisateur"}
                        res.status(500).send(json);
                    } else {
                        const json = {returnCode: 201, message: 'Utilisateur créé avec succès'}
                        res.status(200).send(json);
                    }
                }
            );
        }
    })
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
    jwt.verify(req.headers['authorization'], config.secret, function(err, decoded) {
        if (err) {
            res.status(403).send({ returnCode: 403, message: "Token non valide" });
        } else if (decoded.role === Roles.Admin || decoded.id === req.body.id) {
            // Update only authorized informations
            const body = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                mail: req.body.mail,
                phone: req.body.phone,
                licence: req.body.licence,
            }
            User.findByIdAndUpdate(req.params.id, body, function (err) {
                if (err) {
                    const json = { returnCode: 500, message: "Erreur lors de la mise à jour de l'utilisateur" }
                    res.status(500).send(json);
                } else {
                    const json = { returnCode: 200, message: 'Utilisateur modifié avec succès' }
                    res.status(200).send(json);
                }
            });
        } else {
            res.status(403).send({ returnCode: 403, message: "Vous n'êtes pas autorisé à faire cette action" });
        }
    })
};

exports.deleteUser = function (req, res) {
    User.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            const json = { returnCode: 500, message: "Erreur lors de la suppression de l'utilisateur" }
            res.status(500).send(json);
        } else {
            const json = { returnCode: 200, message: 'Utilisateur supprimé avec succès' }
            res.status(200).send(json);
        }
    });
};

exports.login = function(req, res) {
    User.findOne({'$or': [{mail: req.body.mail}, {phone: req.body.mail}]}, function(err, user) {
        // error
        if (err) {
            const json = { returnCode: 500,  message: 'Erreur serveur' }
            res.send(err, json);
        }
        // user not found
        else if (!user) {
            const json = { returnCode: 401, message: 'Les identifiants sont incorrects' }
            res.status(200).send(json);
        }
        else {
            let pwdsMatches = bcrypt.compareSync(req.body.password, user.password);

            // Check if password is valid
            if (pwdsMatches) {
                // Assign token
                let token = generateToken(user._id, user.role);
                const json = { token: token }
                res.status(200).send(json);
            }
            else { // error
                const json = { returnCode: 401, message: 'Les identifiants sont incorrects' }
                res.status(200).send(json);
            }
        }
    })
}