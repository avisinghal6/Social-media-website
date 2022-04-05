const fs= require('fs');
const rfs= require('rotating-file-stream');

const path= require('path');

const logDirectory= path.join(__dirname, '../production_log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream= rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development={
    name:'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db : 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smptp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''//fill in the password for the username but dont push to github
        }
    },
    google_client_id: '881015180174-8vjhom0s4ndegehgk58ad39u05f4bghb.apps.googleusercontent.com',
    google_client_secret: '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',
    google_call_back_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogStream
        }
    }

}

const production ={
    name:'development',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db : process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smptp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''//fill in the password for the username but dont push to github
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {
            stream: accessLogStream
        }
    }
}

module.exports= eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? 'development' : eval(process.env.CODEIAL_ENVIRONMENT);

//BELOW IF FOR MAC
// FOR PRODUCTION, SAVE THE SECRETS/ CONFIDENTIAL INFO IN THE ./bash_profile.
//AFTER EDITING BASH PROFILE, USE source~./bash_profile  COMMAND, AS ITBASH PROFILE NEEDS TO BE RREFRESHED AFTER EDIT TO REFLECT THE CHANGES


//BELOW IF FOR WINDOWS
//GO TO SYSTEM ENVIRONMENT VARIABLES AND ADD THE VARIABLES
// TO USE, TYPE process.env.<variable_name>

// node command for checking paths