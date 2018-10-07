module.exports = function(app, util) {

  app.get('/:userGuid', async (req, res) => {
    let vars = {
      gitUrl: req.params.userGuid == process.env['APPSETTING_SITE_SITEKEY'] ? process.env['APPSETTING_SITE_GIT_URL'] : "Incorrect url param",
      bashGitUrl: req.params.userGuid == process.env['APPSETTING_SITE_SITEKEY'] ? process.env['APPSETTING_SITE_BASH_GIT_URL'] : "Incorrect url param",
      expiry: process.env['SITE_EXPIRY_UTC'],
      host: process.env['HTTP_HOST']
    };
    let indexContent = await util.loadEnvironmentVariables(vars);

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
    if (req.body.userGuid == process.env['APPSETTING_SITE_SITEKEY']) {
      if (req.body.timestamp) {
        process.env['SITE_EXPIRY_UTC'] = req.body.timestamp;
      }
      util.updateMetadataFile(req.body.timestamp, req.body.guid);
      res.end("Successfully updated meta-data");
    } else {
      res.send(401);
    }
  });

}