//@ts-check
const fs = require('fs');
const util = require('util');
const metaDataFileName = `${__dirname}/metadata.json`;
const promisifiedReadFile = util.promisify(fs.readFile);

module.exports.loadEnvironmentVariables = async function(updateObject) {    
    return await fs.readFileSync(`${__dirname}/template.html`, 'utf8')
        .replace(
            '{ envVars }',
            `let env = ` +
            JSON.stringify(updateObject)
        );
}

module.exports.updateMetadataFile = function(expiryTimestamp) {
    var file =  {expiryTimestamp : expiryTimestamp};
    fs.writeFileSync(metaDataFileName, JSON.stringify(file));
}

module.exports.readMetadataFile = async function() {
    if (fs.existsSync(metaDataFileName)) {
        let content = await promisifiedReadFile(metaDataFileName, 'utf8');
        return JSON.parse(content);
    }
}
