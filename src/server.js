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
  
  app.get('/:userGuid', async (req, res) => {
    let indexContent = await util.loadEnvironmentVariables({
      gitUrl: req.params.userGuid == process.env['USER_GUID'] ? process.env['APPSETTING_SITE_GIT_URL'] : "Incorrect url param",
      bashGitUrl: req.params.userGuid == process.env['USER_GUID'] ? process.env['APPSETTING_SITE_BASH_GIT_URL'] : "Incorrect url param",
      expiry: process.env['SITE_EXPIRY_UTC'],
      host: process.env['HTTP_HOST']
    });

    res.end(indexContent);
  });
  
  app.get('/', async(req, res) => {
    let indexContent = await util.loadEnvironmentVariables({
      gitUrl: "Supply a guid in the url for git write access",
      bashGitUrl: "Supply a guid in the url for git write access",
      expiry: process.env['SITE_EXPIRY_UTC'],
      host: process.env['HTTP_HOST']
    });
    
    res.end(indexContent);
  });
  /**
   * Try app service uses this endpoint to set remaining trial time and set a guid so that only
   * the assigned user can access the git credentials
   */
  app.put('/api/metadata', (req, res) => {
    if (req.body.timestamp) {
      process.env['SITE_EXPIRY_UTC'] = req.body.timestamp;
    }
    if (req.body.guid) {
      process.env['USER_GUID'] = req.body.guid;
    }
    util.updateMetadataFile(req.body.timestamp, req.body.guid);
    res.end("Successfully updated meta-data");
  });
  // Create the HTTP server.
  let server = http.createServer(app);
  server.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
}

main();