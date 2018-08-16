// @ts-check
const express = require('express');
const http = require('http');
const fs = require('fs');
var INDEX_CONTENT = fs
  .readFileSync(`${__dirname}/template.html`, 'utf8')
  .replace(
    '{ envVars }',
    `let env = ` +
      JSON.stringify({
        gitUrl: process.env['APPSETTING_SITE_GIT_URL'],
        bashGitUrl: process.env['APPSETTING_SITE_BASH_GIT_URL'],
        expiry:JSON.parse(fs.readFileSync('metadata.json', 'utf8')).expiryTime,
        host: process.env['HTTP_HOST']
      })
  );
// Azure App Service will set process.env.port for you, but we use 3000 in development.
const PORT = process.env.PORT || 3000;

fs.watchFile('metadata.json', (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  INDEX_CONTENT = fs
  .readFileSync(`${__dirname}/template.html`, 'utf8')
  .replace(
    '{ envVars }',
    `let env = ` +
      JSON.stringify({
        gitUrl: process.env['APPSETTING_SITE_GIT_URL'],
        bashGitUrl: process.env['APPSETTING_SITE_BASH_GIT_URL'],
        expiry:JSON.parse(fs.readFileSync('metadata.json', 'utf8')).expiryTime,
        host: process.env['HTTP_HOST']
      })
  )
  console.log(`the previous mtime was: ${prev.mtime}`);
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
