const passport= require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT= require('passport-jwt').ExtractJwt;//it will help extract the token from the header
const User= require('../models/user');

let opts= {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial' //encryption/decryption key for jwt
}

passport.use(
    new JWTStrategy(opts,function(jwtPayLoad,done){
        User.findById(jwtPayLoad._id, function(err,user){
            if(err){
                console.log('error in finding user from jwt');
                return;
            }

            if(user){
                
                return done(null,user);
            }

            return done(null,false);
        });
    })
);

module.exports=passport;