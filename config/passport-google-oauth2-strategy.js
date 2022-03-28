const passport = require('passport');
const googleStrategy= require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User= require('../models/user');

passport.use(new googleStrategy({
    clientID: '881015180174-8vjhom0s4ndegehgk58ad39u05f4bghb.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},
function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log("error in google strategy-passport", err);
            return ;

        }

        console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err,user){
                if(err){
                    console.log("error in google strategy-passport", err);
                    return ;
                }

                return done(null,user);
            })
        }
    })
}

));