const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actors.controller');
const protectRoute = require( "../middleware/protectRoute");
const upload = require("../utils/multer.js");


// Get all actors
router.get('/', protectRoute, actorController.getAllActors);

// Get a specific actor
router.get('/:id', protectRoute,actorController.getActorById);

// Create a new actor
router.post('/', protectRoute, upload.single("profilePic"),actorController.createActor);

// Update an actor
router.put('/:id', protectRoute, upload.single("profilePic"),actorController.updateActor);

// Delete an actor
router.delete('/:id', protectRoute,actorController.deleteActor);

module.exports = router;
