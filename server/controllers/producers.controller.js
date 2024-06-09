const Producer = require('../models/producer.model');
const Movie = require('../models/movie.model');
const cloudinary = require("../utils/cloudinary.js");


// Get all producers
const getAllProducers = async (req, res) => {
    try {
        const producers = await Producer.find();
        res.json(producers);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch producers' });
    }
};

// Get a specific producer by ID
const getProducerById = async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.id);
        if (!producer) {
            return res.status(404).json({ message: 'Producer not found' });
        }
        res.json(producer);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch producer' });
    }
};

// Create a new producer
const createProducer = async (req, res) => {
    try {
        let profilePicUrl = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            profilePicUrl = result.secure_url;
        }
        const producer = new Producer({
            name: req.body.name,
            gender: req.body.gender,
            dob: req.body.dob,
            bio: req.body.bio,
            profilePic: profilePicUrl,
        });
        const newProducer = await producer.save();
        res.status(201).json(newProducer);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create producer' });
    }
};

// Update a producer by ID
const updateProducer = async (req, res) => {
    try {
        let profilePicUrl = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            profilePicUrl = result.secure_url;
        }

        const updatedData = {
            ...req.body,
            ...(profilePicUrl && { profilePic: profilePicUrl })
        };

        const updatedProducer = await Producer.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
        if (!updatedProducer) {
            return res.status(404).json({ message: 'Producer not found' });
        }
        res.json(updatedProducer);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update producer' });
    }
};

// Delete a producer by ID
const deleteProducer = async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.id);
        if (!producer) {
            return res.status(404).json({ message: 'Producer not found' });
        }
        await Movie.deleteMany({ producer: req.params.id });

        await Producer.findByIdAndDelete(req.params.id);

        res.json({ message: 'Deleted producer and associated movies' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete producer and associated movies' });
    }
};

module.exports = {
    getAllProducers,
    getProducerById,
    createProducer,
    updateProducer,
    deleteProducer
};
