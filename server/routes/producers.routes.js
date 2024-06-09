const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producers.controller');
const protectRoute = require( "../middleware/protectRoute");
const upload = require("../utils/multer.js");


// Get all producers
router.get('/', protectRoute,producerController.getAllProducers);

// Get a specific producer
router.get('/:id', protectRoute,producerController.getProducerById);

// Create a new producer
router.post('/', protectRoute, upload.single("profilePic"),producerController.createProducer);

// Update a producer
router.put('/:id', protectRoute, upload.single("profilePic"),producerController.updateProducer);

// Delete a producer
router.delete('/:id', protectRoute,producerController.deleteProducer);

module.exports = router;
