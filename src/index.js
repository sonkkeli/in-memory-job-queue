const express = require('express');
const app = express();
const server = require('./server');
app.use(express.json());

server.setupRoutes(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/**
 * Some of the TODO:s and cut corners (there are plenty):
 *
 * Testing, building the app (now only support for running with dev server)
 * from in-memory -> database, linting, logging, some kind of authentication etc many things...
 * Decoupling the endpoints from each other... now they're all reading things from the same queues,
 * so probably having multiple simultaneous "CRUD" operations for the queues would break things...
 */
