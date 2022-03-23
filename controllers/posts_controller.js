const Post= require('../models/post');
const Comment= require('../models/comment');

module.exports.create = async function(req,res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','post published!');
        return res.redirect('back');
    }catch{
        req.flash('error',err);
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
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            req.flash('success','post and associated deleted');
            return res.redirect('back');
        }else{
            req.flash('error','you cannot delete this post');
            return res.redirect('back');
        }
    }catch{
        req.flash('error',err);
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
