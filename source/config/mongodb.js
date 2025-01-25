const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
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