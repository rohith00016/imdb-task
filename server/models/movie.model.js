const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: { type: String, required: true, maxlength: 255 },
    yearOfRelease: { type: Number, min: 1800, max: new Date().getFullYear(),required: true, }, 
    plot: { type: String, required: true},
    poster: { type: String, required: true},
    producer: { type: Schema.Types.ObjectId, ref: 'Producer', required: true }, 
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }]
});


module.exports = mongoose.model('Movie', MovieSchema);
