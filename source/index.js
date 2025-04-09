const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./configs/mongodb.js');
const { PORT } = require('./configs/config.js');
const routes = require('./routes');
// const { errorHandler } = require('./middlewares/error.js');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

connectDB(); // Connect to mongodb

const app = express();

////////  Middleware ////////////////
app.use(cors()); // Enable cross-origin requests
app.use(bodyParser.json()); // Enables json parsing
// app.use(errorHandler()); // Error handling middleware
////////  Centralized routing ////////////////
app.use('/api', routes);

////////  Export app for testing ////////////////
module.exports = app;

////////  Start the server if not in test mode ////////////////
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}