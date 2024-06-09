const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connected to Database');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
