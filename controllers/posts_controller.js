const Post= require('../models/post');
const Comment= require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function(req,res){
    try{
        
        let post= await Post.create({
                content: req.body.content,
                user: req.user._id
            });

        
        if(req.xhr){  //check if if it is xhr request
             // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            
            post = await post.populate('user');
            return res.status(200).json({ //the response for xhr request is different from http response. xhr response includes a json object
                data:{
                    post: post
                },
                message: "Post created"
            })
        }
        req.flash('success','post published!');
        return res.redirect('back');
    }catch{
        req.flash('error','error');
        return;
    }
    

}



// module.exports.create = function(req,res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     },
//     function(err,post){
//         if(err){
//             console.log('error in creating a post'); 
//             return; 
//         }

//         return res.redirect('back');
//     });
// }


module.exports.destroy = async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user== req.user.id){  //req.params.id, when using '.id' mongoose converts the object id to string
            
            //delete the associated likes for the post and all of its comments's likes too
            await Like.deleteMany({likeable: post._id, onModel: 'Post'});
            await Like.deleteMany({_id:{$in: post.comments}});
            
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "post deleted"
                })
            }
            req.flash('success','post and associated deleted');
            return res.redirect('back');
        }else{
            req.flash('error','you cannot delete this post');
            return res.redirect('back');
        }
    }catch{
        
        req.flash('error',"error");
    }
    
}


// module.exports.destroy = function(req,res){
    
//     Post.findById(req.params.id, function(err, post){
//         if(post.user== req.user.id){  //req.params.id, when using '.id' mongoose converts the object id to string
//             if(err){
                
//                 return res.redirect('back');
//             }
//             post.remove();
//             Comment.deleteMany({post: req.params.id}, function(err){
//                 if(err){
//                     console.log("error deleting");

//                 }
                
//                 return res.redirect('back');
//             })
//         }else{
        
//             return res.redirect('back');
//         }
//     });
// }
