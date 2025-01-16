const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');
const mongoose = require('mongoose');

const connectDB = require('./config/mongodb.js');
const dotenv = require('dotenv');
const routes = require('./routes'); 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

dotenv.config(); // Load environment variables
connectDB(); // Connect to mongodb

const app = express();
const PORT = process.env.PORT || 3000;

////////  Middleware ////////////////
app.use(cors()); // Enable cross-origin requests
app.use(bodyParser.json()); // Enables json parsing

////////  Centralized routing ////////////////
app.use('/api', routes);


////////  Begin listening  ////////////////
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});