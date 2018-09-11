//@ts-check
const fs = require('fs');
const util = require('util');
const metaDataFileName = `${__dirname}/../metadata.json`;
var file = require(metaDataFileName);
const promisifiedReadFile = util.promisify(fs.readFile);

module.exports.loadEnvironmentVariables = async function(updateObject) {    
    return await fs.readFileSync(`${__dirname}/template.html`, 'utf8')
        .replace(
            '{ envVars }',
            `let env = ` +
            JSON.stringify(updateObject)
        );
}

module.exports.updateMetadataFile = function(expiryTimestamp, userGuid) {
    file.expiryTimestamp = expiryTimestamp;
    file.userGuid = userGuid;
    fs.writeFileSync(metaDataFileName, JSON.stringify(file));
}

module.exports.readMetadataFile = async function() {
    let content = await promisifiedReadFile(metaDataFileName, 'utf8');
    return JSON.parse(content);
}