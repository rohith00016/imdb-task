const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProducerSchema = new Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true},
    dob: { type: Date, required: true }, 
    bio: { type: String, required: true },
    profilePic: { type: String } 
});

module.exports = mongoose.model('Producer', ProducerSchema);
