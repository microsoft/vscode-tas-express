// @ts-check
var loadEnvironmentVariables = require('./util');

const express = require('express');
const http = require('http');
const fs = require('fs');
var INDEX_CONTENT = loadEnvironmentVariables();
// Azure App Service will set process.env.port for you, but we use 3000 in development.
const PORT = process.env.PORT || 3000;

// needed to update remaining time of app service trial
fs.watchFile('metadata.json', (curr, prev) => {
  INDEX_CONTENT = loadEnvironmentVariables();
});

// Create the express routes
let app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.end(INDEX_CONTENT);
});

// Create the HTTP server.
let server = http.createServer(app);
server.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});

