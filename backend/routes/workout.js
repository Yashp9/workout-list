const express = require("express");
const { default: mongoose } = require("mongoose");
const workout = require("../model/workout.model");
const { createWorkout, getAllWorkouts, getworkout ,deleteworkout, updateworkout} = require("../controllers/workout.controler");
const router = express.Router();

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
