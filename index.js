const express= require('express');
const app= express();
const port=8000;
const expressLayouts= require('express-ejs-layouts');
const db= require('./config/mongoose');
const cookieParser= require('cookie-parser');
app.use(express.urlencoded());
app.use(cookieParser());




//using layouts, it needs to placed before the route controller so that the ejs pages can use the layout
app.use(expressLayouts);

app.set('view engine', 'express');
app.set('views','./assets');

// for extracting the scripts and css files from the variable content and placing appropriately in layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// use express router
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    };

    console.log(`server is running on port ${port}`);


});