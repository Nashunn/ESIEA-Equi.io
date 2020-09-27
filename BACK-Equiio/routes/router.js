const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const horsesController = require("../controllers/horsesController");
const lessonsController = require("../controllers/lessonsController");

router
    .post("/users", usersController.createUser)
    .get("/users", usersController.findAllUsers)
    .get("/users/:id", usersController.getUser)
    .put("/users/:id", usersController.updateUser)

router
    .get("/horses", horsesController.findAllHorses)
    .post("/horses", horsesController.createHorse)

router
    .get("/lessons", lessonsController.findAllLessons)
    .post("/lessons", lessonsController.createLesson)

module.exports = router;