const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./configs/mongodb.js');
const {PORT} = require('./configs/config.js');
const routes = require('./routes');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

connectDB(); // Connect to mongodb

const app = express();

////////  Middleware ////////////////
app.use(cors()); // Enable cross-origin requests
app.use(bodyParser.json()); // Enables json parsing

////////  Centralized routing ////////////////
app.use('/api', routes);

////////  Begin listening  ////////////////
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});