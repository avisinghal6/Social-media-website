const Post=require('../../../models/post');
const Comment= require('../../../models/comment');
module.exports.index= async function(req,res){
    try{
        let posts= await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        return res.json(200,{
            message:"list of posts",
            posts: posts
        });
    }catch{
        console.log("error");
    }

    
}

module.exports.destroy= async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        console.log(req);
        if(post.user== req.user.id){  //req.params.id, when using '.id' mongoose converts the object id to string
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            
            // req.flash('success','post and associated deleted');
            return res.json(200,{
                message: "post and associated comments deleted"
            })
    
        }else{
            console.log(req.user);
            return res.json(401,{
                message: "you cannot delete this post"
            });
        }
    }catch(err){
        console.log(err);
        res.json(500,{
            message: "internal server error"
        });
    }
    
}