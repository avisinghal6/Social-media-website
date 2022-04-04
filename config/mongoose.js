const mongoose= require('mongoose');
const env= require('./environment');


mongoose.connect(`mongodb://localhost/${env.db}`); //`` back ticks are used here
const db=mongoose.connection;

db.on('error', console.error.bind(console,'error connecting to mongodb'));

db.once('open', function(){
    console.log('connceted to database:: mongodb');
})

module.exports= db;