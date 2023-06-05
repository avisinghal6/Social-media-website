const req = require('express/lib/request');
const passport= require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User= require('../models/user');
//Authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email', // the username field according to the schema used is "email", this helps identify the email and password which are passed to below function
        passReqToCallback: true
    },
    function(req,email,password,done){ //done is inbuilt function of passport and will executed based on status of request
        //find user and establish the identity
        User.findOne({email: email}, function(err,user){ //whenever passport is being called, email and password are automatically passed to the function
            if(err){
                req.flash('error', err);
                return done(err); //done takes 2 arguments
            }

            if(!user || user.password!=password){
                req.flash('error', 'invalid credentials');
                return done(null,false); //false is because authentication has not been done
            }
            // console.log("inside use");
            return done(null,user);
        });
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    console.log("serialiser");
    done(null, user.id); // we just want to store the encrypted "user id" in the cookie
});


// de-serializing the user from the key in the cookies, it means we are using the key of the cookie to extract data from database
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('error in finding user --> passport');
            return done(err);

        }

        console.log("deserialiser");
        return done(null, user);
    });
});


//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    if(req.xhr){
        console.log("here");
        return res.status(200).json({
            data:{
                redirect: "/users/sign-in"
            },message: "redirection"
        });
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser= function(req,res,next){

    if(req.isAuthenticated()){
        
        res.locals.user= req.user; //send the "user" to locals for views, so we can directly use "user" without explicitly passing it in the controller as a parameter
        // console.log(res.locals.user);
    }

   
    next();
}   
module.exports= passport;