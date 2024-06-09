const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movies.controller');
const protectRoute = require("../middleware/protectRoute");
const upload = require("../utils/multer.js");

// Get all movies
router.get('/', protectRoute, movieController.getAllMovies);

// Get a specific movie by ID
router.get('/:id', protectRoute, movieController.getMovieById);

// Add a new movie
router.post('/', protectRoute, upload.single("poster"), movieController.addMovie);

// Update a movie
router.put('/:id', protectRoute, upload.single("poster"), movieController.updateMovie);

// Delete a movie
router.delete('/:id', protectRoute, movieController.deleteMovie);

module.exports = router;
