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
    .post("/users/login", usersController.login)
    .delete("/users/:id", usersController.deleteUser)

router
    .get("/horses", horsesController.findAllHorses)
    .post("/horses", horsesController.createHorse)
    .put("/horses/:id", horsesController.updateHorse)
    .delete("/horses/:id", horsesController.deleteHorse)

router
    .get("/lessons", lessonsController.findAllLessons)
    .post("/lessons", lessonsController.createLesson)
    .put("/lessons/:id", lessonsController.updateLesson)
    .delete("lessons/:id", lessonsController.deleteLesson)

module.exports = router;