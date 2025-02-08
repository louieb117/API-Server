require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    MY_JWT_SECRET: process.env.MY_JWT_SECRET
};