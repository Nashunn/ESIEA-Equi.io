const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const usersController = require("../controllers/usersController");
const horsesController = require("../controllers/horsesController");
const lessonsController = require("../controllers/lessonsController");
const Roles = require("../models/roles");
const config = require("../config/config")

checkAuth = function (roles) {
    return async (req, res, next) => {
        console.log(req.headers['authorization'])
        jwt.verify(req.headers['authorization'], config.secret, function(err, decoded) {
            console.log(err)
            console.log(decoded)
            if (err) {
                res.status(403).send({ returnCode: 403, message: "Token non valide" });
            } else if (!roles.includes(decoded.role)) {
                res.status(403).send({ returnCode: 403, message: "Vous n'êtes pas autorisé à faire cette action" });
            } else {
                next();
            }
        })
    }
}

router
    .post("/auth/login", usersController.login)
    .post("/auth/register", usersController.registerUser, )

router
    .post("/users", checkAuth([Roles.Admin]), usersController.createUser)
    .get("/users", checkAuth([Roles.Admin]), usersController.findAllUsers)
    .get("/users/:id", checkAuth([Roles.Admin, Roles.Teacher, Roles.User]), usersController.getUser)
    .put("/users/:id", checkAuth([Roles.Admin, Roles.Teacher, Roles.User]), usersController.updateUser)
    .delete("/users/:id", checkAuth([Roles.Admin]), usersController.deleteUser)

router
    .get("/horses", checkAuth([Roles.Admin, Roles.Teacher, Roles.User]), horsesController.findAllHorses)
    .post("/horses", checkAuth([Roles.Admin]), horsesController.createHorse)
    .put("/horses/:id", checkAuth([Roles.Admin]), horsesController.updateHorse)
    .delete("/horses/:id", checkAuth([Roles.Admin]), horsesController.deleteHorse)

router
    .get("/lessons", checkAuth([Roles.Admin, Roles.Teacher, Roles.User]), lessonsController.findAllLessons)
    .get("/lessons/:id", checkAuth([Roles.Admin, Roles.Teacher, Roles.User]), lessonsController.findLesson)
    .post("/lessons", checkAuth([Roles.Admin, Roles.Teacher]), lessonsController.createLesson)
    .put("/lessons/:id", checkAuth([Roles.Admin, Roles.Teacher]), lessonsController.updateLesson)
    .delete("lessons/:id", checkAuth([Roles.Admin, Roles.Teacher]), lessonsController.deleteLesson)

module.exports = router;