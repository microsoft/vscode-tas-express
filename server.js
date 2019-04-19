// @ts-check
var util = require('./util');
const express = require('express');
const http = require('http');
const url = require('url'); 
var cookieParser = require('cookie-parser');
const request = require('request');

async function main() {
  // Azure App Service will set process.env.port for you, but we use 3000 in development.
  const PORT = process.env.PORT || 3000;
  // Create the express routes
  let app = express();
  app.use(express.static('public'));
  app.use(cookieParser());

  app.get('/', async (req, res) => {
    if(req.query && req.query.loginsession)
    {
    res.cookie('loginsession',req.query.loginsession, { maxAge: 3600000, httpOnly: true, })
    res.redirect(url.parse(req.url).pathname);
    }
    else
    {
    let indexContent = await util.loadEnvironmentVariables({host: process.env['HTTP_HOST']});
    res.end(indexContent);
    }
  });

  app.get('/api/metadata', async (req, res) => {
    if (req.cookies.loginsession) {
      let tryappserviceendpoint= (process.env['APPSETTING_TRYAPPSERVICE_URL'] || 'https://tryappservice.azure.com') + '/api/vscoderesource';
      const options = {
        url: tryappserviceendpoint,
        headers:{
            cookie: 'loginsession='+req.cookies.loginsession
        }
      };
      
  const x =request(options);
  x.pipe(res);
}
else{
  res.end(404);
}
});

// Create the HTTP server.
  let server = http.createServer(app);
  server.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
}

main();
