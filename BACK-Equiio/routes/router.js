const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const horsesController = require("../controllers/horsesController");
const lessonsController = require("../controllers/lessonsController");

router
    .get("/users", usersController.findAllUsers)
    .post("/users", usersController.createUser)

router
    .get("/horses", horsesController.findAllHorses)
    .post("/horses", horsesController.createHorse)

router
    .get("/lessons", lessonsController.findAllLessons)
    .post("/lessons", lessonsController.createLesson)

module.exports = router;