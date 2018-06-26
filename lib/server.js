// @ts-check
let express = require('express');
let http = require('http');

// Azure App Service will set process.env.port for you, but we use 3000 in development.
const PORT = process.env.PORT || 3000;

// Create the express routes
let app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.end(`
    <!DOCTYPE html>
    <style>
      body {
          font-family: "Segoe UI", sans-serif;
          text-align: center;
      }

      #logo {
        width: 300px;
        height: 300px;
      }
    </style>
    <meta charset='utf8'>
    <div id="hero">
      <h2>👋 Hello from Express</h2>
      <h3>⛅ Lovingly Hosted in the Cloud by Azure App Service</h3>
      <img src='./images/aas-logo.svg' id=logo>
    </div>
    <h4>Next Steps</h4>
    1. Check out your code: [insert git URL]<br>
    2. Read the app's <a href="https://github.com/microsoft/vscode-tas-azure">readme</a>.<br>
    3. <a href="https://github.com/microsoft/vscode-tas-azure">Contribute</a> to this Sample.
  `);
});
// Create the HTTP server.
let server = http.createServer(app);
server.listen(PORT, function() {
  console.log(
    `Listening on ${server.address().address}:${server.address().port}`
  );
});
