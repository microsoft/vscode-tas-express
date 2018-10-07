// @ts-check
var util = require('./util');
const express = require('express');
const http = require('http');
var bodyParser = require("body-parser");


async function main() {
  let expiryTimestamp;
  if (!process.env['SITE_EXPIRY_UTC'] || !process.env['USER_GUID']) {
    let fileData = (await util.readMetadataFile());
    process.env['SITE_EXPIRY_UTC'] = fileData.expiryTimestamp;
    process.env['USER_GUID'] = fileData.userGuid;
  }


  
  // Azure App Service will set process.env.port for you, but we use 3000 in development.
  const PORT = process.env.PORT || 3000;
  // Create the express routes
  let app = express();
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  var routes = require('./routes')(app, util);
  // Create the HTTP server.
  let server = http.createServer(app);
  server.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
}

main();