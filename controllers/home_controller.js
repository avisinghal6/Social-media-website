const Post= require('../models/post');
const User= require('../models/user');

//to avoid callback hell, use async await
module.exports.home = async function(req,res){

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

            let users= await User.find({});
            // console.log(req.session);
            return res.render('home',{
                                title:'Codial | home',
                                posts: posts,
                                all_users: users
                            });

        }catch{
            console.log("error",err);
        }
       
}

//for populating the posts with the 'user' field, below code can lead to callback hell
// module.exports.home = function(req,res){
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err,posts){

//         User.find({}, function(err,users){
//             return res.render('home',{
//                 title:'Codial | home',
//                 posts: posts,
//                 all_users: users
//             });
//         });
        
//     });
    
// };



