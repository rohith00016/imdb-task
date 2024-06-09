const Actor = require("../models/actor.model");
const Movie = require("../models/movie.model");
const cloudinary = require("../utils/cloudinary.js");

// Get all actors
const getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json(actors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch actors" });
  }
};

// Get a specific actor by ID
const getActorById = async (req, res) => {
  try {
    console.log(req.params);
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }
    res.json(actor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch actor" });
  }
};

// Create a new actor
const createActor = async (req, res) => {
  try {
    let profilePicUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profilePicUrl = result.secure_url;
    }
    const actor = new Actor({
      name: req.body.name,
      gender: req.body.gender,
      dob: req.body.dob,
      bio: req.body.bio,
      profilePic: profilePicUrl,
    });
    const newActor = await actor.save();
    res.status(201).json(newActor);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(400)
      .json({ message: "Failed to create actor", error: err.message });
  }
};

// Update an actor by ID
const updateActor = async (req, res) => {
    try {
      let profilePicUrl = ""; // Initialize profilePicUrl
      if (req.file) { // Check if a new file is uploaded
        const result = await cloudinary.uploader.upload(req.file.path); // Upload new file to Cloudinary
        profilePicUrl = result.secure_url; // Get the secure URL of the uploaded file
      }
  
      // Construct the actor object with updated data including profilePicUrl
      const updatedData = { 
        ...req.body, 
        ...(profilePicUrl && { profilePic: profilePicUrl }) // Include profilePicUrl if it exists
      };
  
      // Find the actor by ID and update with the updatedData
      const updatedActor = await Actor.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true, runValidators: true }
      );
  
      // Check if actor is found
      if (!updatedActor) {
        return res.status(404).json({ message: "Actor not found" });
      }
  
      res.json(updatedActor); // Send the updated actor as response
    } catch (err) {
      res.status(400).json({ message: "Failed to update actor" });
    }
  };
  

// Delete an actor by ID
const deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }

    // Delete the actor
    await Actor.findByIdAndDelete(req.params.id);

    // Update all movies by removing the actor's ID from actorsIds array
    await Movie.updateMany(
      { actorsIds: req.params.id },
      { $pull: { actorsIds: req.params.id } }
    );

    res.json({ message: "Deleted actor and updated movies" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to delete actor and update movies" });
  }
};

module.exports = {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deleteActor,
};
