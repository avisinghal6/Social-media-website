
const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    app.locals.assetPath = function(filePath){ //adding a locals to the application
        if (env.name == 'development'){
            return '/'+filePath;
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    } // 'JSON.parse' is used because manifest is json file
}