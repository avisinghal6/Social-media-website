const Post= require('../models/post');


//for populating the posts with the 'user' field
module.exports.home = function(req,res){
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:'Codial | home',
            posts: posts
        });
    });
    
};