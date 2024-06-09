const Movie = require("../models/movie.model");
const Producer = require("../models/producer.model");
const Actor = require("../models/actor.model");
const cloudinary = require("../utils/cloudinary.js");

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("producer").populate("actors");
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate("producer")
      .populate("actors");
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new movie
const addMovie = async (req, res) => {
  const { name, yearOfRelease, plot, producer, actors } = req.body;

  try {
    let posterUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      posterUrl = result.secure_url;
    }
    const producerExists = await Producer.findById(producer);
    if (!producerExists) {
      return res.status(400).json({ message: "Producer not found" });
    }

    // Check if the actors exist
    const actorsExist = await Actor.find({ _id: { $in: actors } });
    if (actors.length !== actorsExist.length) {
      return res.status(400).json({ message: "One or more actors not found" });
    }

    const movie = new Movie({
      name,
      yearOfRelease,
      plot,
      poster:posterUrl,
      producer,
      actors,
    });

    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a movie
const updateMovie = async (req, res) => {
  const { name, yearOfRelease, plot, producer, actors } = req.body;

  try {
    let posterUrl = ""; 
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      posterUrl = result.secure_url; 
    }

    // Check if the producer exists
    const producerExists = await Producer.findById(producer);
    if (!producerExists) {
      return res.status(400).json({ message: "Producer not found" });
    }

    // Check if the actors exist
    const actorsExist = await Actor.find({ _id: { $in: actors } });
    if (actors.length !== actorsExist.length) {
      return res.status(400).json({ message: "One or more actors not found" });
    }

    // Create an object to store updated movie data
    const updatedMovieData = {
      name,
      yearOfRelease,
      plot,
      producer,
      actors
    };

    // If a new poster URL is available, add it to the updated movie data
    if (posterUrl) {
      updatedMovieData.poster = posterUrl;
    }

    // Find and update the movie by ID
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      updatedMovieData,
      { new: true }
    );

    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
