const http = require('http');
const app = require('./index'); // Import the Express app
const { PORT } = require('./configs/config.js');

// Create and start the HTTP server
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});