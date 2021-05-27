const express = require('express');
const app = express();
const server = require('./server');
app.use(express.json());

server.setupRoutes(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
