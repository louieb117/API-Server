const mongoose = require('mongoose');
const {MONGO_URI} = require('./config.js');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error: ${error.message}');
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;