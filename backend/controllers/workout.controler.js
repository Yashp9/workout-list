const workout = require("../model/workout.model");
const mongoose = require("mongoose");

//get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const user_id=req.user._id.toString();
    const allWorkouts = await workout.find({user_id}); // Ensure the 'workout' model is correctly imported and available
    if (allWorkouts.length > 0) {
      // If workouts exist, return them as JSON
      return res.status(200).json(allWorkouts);
    } else {
      // Return an empty array if no workouts found
      return res.status(200).json([]);
    }
  } catch (error) {
    // If an error occurs, send a detailed message
    return res
      .status(500)
      .json({
        message: `Error occurred in getting all workouts: ${error.message}`,
      });
  }
};

//get a single workout
const getworkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "invalid id" });
  }
  try {
    const sing_workout = await workout.findById(id);
    if (!sing_workout) {
      return res.status(404).json({ message: "no such workout available" });
    }
    res.status(200).json(sing_workout);
  } catch (error) {
    res
      .status(400)
      .json({ message: `error occured in getting workout ${error.message}` });
  }
};

//create a workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  console.log("title = ",title," load  = ",load," reps = ",reps)
  try {
    if (title == '' || load == '' || reps == '') {
      throw new Error("please enter all the properties");
    }
    //add doc to db.
    const user_id = req.user._id.toString();
    const newworkout = new workout({ title, load, reps ,user_id});
    await newworkout.save();
    res.status(201).json(newworkout);
  } catch (error) {
    res
      .status(400)
      .json({ message: `error occured in creation :- ${error.message}` });
  }
};

//delete a workout
const deleteworkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "invalid id" });
  }
  try {
    const deleted = await workout.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "no such workout available" });
    }
    res
      .status(200)
      .json(deleted);
  } catch (error) {
    res
      .status(400)
      .json({ message: `error occured in deletion ${error.message}` });
  }
};
//update a workout
const updateworkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "invalod id" });
  }
  const { title, reps, load } = req.body;
  try {
    const updated = await workout.findByIdAndUpdate(
      id,
      { title, reps, load },
      { new: false }
    );
    if (!updated) {
      return res.status(404).json({ message: "no such workout available" });
    }
    res.status(200).json({ message: ` ${updated.title} workout update` });
  } catch (error) {
    res
      .status(400)
      .json({ message: `error occured in updation : ${error.message}` });
  }
};

//exports controllers.

module.exports = {
  createWorkout,
  getAllWorkouts,
  getworkout,
  deleteworkout,
  updateworkout,
};
