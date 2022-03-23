const Comment= require('../models/comment');
const Post= require('../models/post');

module.exports.create= async function(req,res){
    try{
        let post=await Post.findById(req.body.post);

        if(post){
            let comment=await Comment.create({
                            content: req.body.content,
                            post: req.body.post,
                            user: req.user._id
                            });

            post.comments.push(comment);
            post.save(); //save needs to be called after updating
                            
            res.redirect('/');
        }
    }catch{
        console.log(err);
    }
    
}


// module.exports.create= function(req,res){
//     Post.findById(req.body.post, function(err,post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 post.comments.push(comment);
//                 post.save(); //save needs to be called after updating

//                 res.redirect('/');
//             });
//         }
//     });
// }

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user== req.user.id){  //req.params.id, when using '.id' mongoose converts the object id to string

            let postId= comment.post;
            comment.remove();
            let post=await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id}});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch{
        console.log(err);
    }
}


// module.exports.destroy = function(req,res){
    
//     Comment.findById(req.params.id, function(err, comment){
//         if(comment.user== req.user.id){  //req.params.id, when using '.id' mongoose converts the object id to string
//             if(err){
                
//                 return res.redirect('back');
//             }

//             let postId= comment.post;
//             comment.remove();
//             Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id}}, function(err,post){ //$pull is used to pullout the comments with th id specified
//                 return res.redirect('back');
//             });

           
//         }else{
        
//             return res.redirect('back');
//         }
//     });
// }
