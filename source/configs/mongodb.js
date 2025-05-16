const mongoose = require('mongoose');
const { MONGO_URI } = require('./config.js');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw new Error('Failed to connect to MongoDB'); // Throw an error instead of exiting
    }
};

module.exports = { connectDB, mongoose };