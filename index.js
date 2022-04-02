const express= require('express');
const app= express();
const port=8000;
const expressLayouts= require('express-ejs-layouts');
const db= require('./config/mongoose');
const flash= require('connect-flash');
const customMware= require('./config/middleware');
//setup chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets= require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

//for session cookie
const session= require('express-session');
const passport= require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy'); //need to import these stategies
const passportGoogle=require('./config/passport-google-oauth2-strategy'); //need to import these stategies


const MongoStore = require('connect-mongo');
const cookieParser= require('cookie-parser');
const sassMiddleware= require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss', //usng "." makes it work
    dest:'./assets/css',
    debug:false,
    outputStyle: 'extended',
    prefix:'/css'
}));
    
app.use(express.urlencoded()); // used to extract the data from the body of the request
app.use(cookieParser());
//make the uploads path available to the browser, since it is static file, we dont need to creater routes.
app.use('/uploads',express.static(__dirname+'/uploads'));

//using layouts, it needs to placed before the route controller so that the ejs pages can use the layout
app.use(expressLayouts); 

app.set('view engine', 'express');
app.set('views','./views');

// for extracting the scripts and css files from the variable content and placing appropriately in layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.static('./assets'));

app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session in the db
//this is done after setting views
app.use(session({
    name: 'codial', //name of the application, this is the cookie name
    //todo change the secret before deployment in production mode
    secret: 'blahsomething', //this is the key which is used for coding/decoding the cookie
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codial_development'
    })
}));



// this should be done before the router
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // this is placed after session middleware, because flash is stored in the session using locals.
app.use(customMware.setFlash);
app.use(passport.setAuthenticatedUser);
// use express router
app.use('/', require('./routes'));



app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    };

    console.log(`server is running on port ${port}`);


});