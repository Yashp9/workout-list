const express = require("express");
const { default: mongoose } = require("mongoose");
const workout = require("../model/workout.model");
const { createWorkout, getAllWorkouts, getworkout ,deleteworkout, updateworkout} = require("../controllers/workout.controler");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//require auth for all workouts routes.

//this middleware also added the the user to the requiest so that theother middleware can use it.
router.use(requireAuth);

//get the all workout
router.get("/", getAllWorkouts);

//get one workout
router.get('/:id',getworkout);

//post a new workout
router.post("/",createWorkout);

//delete a new workout
router.delete("/:id", deleteworkout);

//Update a new workout
router.patch("/:id",updateworkout);

module.exports = router;
