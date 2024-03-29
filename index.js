const express = require("express");
const env = require("./config/environment"); // Getting environment information
const logger = require("morgan"); // required for logging
const app = express();
require("./config/view-helpers")(app);
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const flash = require("connect-flash"); // For flash messages
const customMware = require("./config/middleware");
//setup chat server to be used with socket.io
const chatServer = require("http").Server(app); //creates an http server for which 'app' is the function handler.
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(2000);
console.log("chat server is listening on port 2000");

//for session cookie
const session = require("express-session");

const passport = require("passport");
// Reason for importing the following modules: passport is imported once and its reference is saved in "passport object above"
// passport is imported in below files as well and these files add certain functions to the "passport object",
// if we dont import the below files, then those functions will not be accessible.
// main reason for the functions being accesible is that import is actually done only ONCE, the other times the reference of the 
//same object is returned. Thats why all the below files refer to same object (mentioned above) and update the same object.
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy"); //need to import these stategies
const passportGoogle = require("./config/passport-google-oauth2-strategy"); //need to import these stategies

console.log(passport)
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const tpath = require("path");

if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"), //usng "." makes it work
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: false,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}

app.use(express.urlencoded({ extended: false })); // used to extract the data from the body of the request
app.use(cookieParser());
//make the uploads path available to the browser, since it is static file, we dont need to creater routes.
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(logger(env.morgan.mode, env.morgan.options));

//using layouts, it needs to placed before the route controller so that the ejs pages can use the layout
app.use(expressLayouts);

app.set("view engine", "express");
app.set("views", "./views");

// for extracting the scripts and css files from the variable content and placing appropriately in layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.static(env.asset_path));

app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session in the db
//this is done after setting views
app.use(
  session({
    name: "codial", //name of the application, this is the cookie name
    //todo change the secret before deployment in production mode
    secret: env.session_cookie_key, //this is the key which is used for coding/decoding the cookie
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/codial_development",
    }),
  })
);

// this should be done before the router
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // this is placed after session middleware, because flash is stored in the session using locals.
app.use(customMware.setFlash);
app.use(passport.setAuthenticatedUser);
// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  //creates a http server, 'express' handles the creation part
  if (err) {
    console.log(`Error : ${err}`);
    return;
  }

  console.log(`server is running on port ${port}`);
});

//to start redis use: redis-server
//to start mongodb use :brew services start mongodb-community
