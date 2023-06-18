const Friendship= require('../models/friendships');
const User= require('../models/user');

module.exports.addFriend= async function(req,res){
    try{
        let fromUser= req.user._id;
        let toUser= req.params.friend_id;

        let newfriend= await Friendship.create({
            from_user: fromUser,
            to_user: toUser
        });

        // console.log(toUser);
        let to_userObject= await User.findById(toUser);
        let from_userObject= await User.findById(fromUser);
        // console.log(to_userObject);

        to_userObject.friendships.push(newfriend._id);
        to_userObject.save();
        from_userObject.friendships.push(newfriend._id);
        from_userObject.save();

        return res.redirect('/');
        // return res.json(200,{
        //     message:"friend added successfully",
        //     data: {
        //         toUser: toUser
        //     }
        // })
        

    }catch(err){
        console.log(err);
    }
    

}

module.exports.removeFriend= async function(req,res){
    try{
        let fromUser= req.user._id;
        let toUser= req.params.friend_id;


        let to_userObject= await User.findById(toUser).populate('friendships');
        let from_userObject= await User.findById(fromUser).populate('friendships');

        // console.log(from_userObject.friendships)
        let deleteFriendId;
        for(friend of from_userObject.friendships){
            if(friend.to_user == toUser || friend.from_user== toUser){
                deleteFriendId= friend._id;
            }
        }

        await Friendship.findByIdAndDelete(deleteFriendId);
        await User.findByIdAndUpdate(fromUser, { $pull: { friendships: deleteFriendId}});
        await User.findByIdAndUpdate(toUser, { $pull: { friendships: deleteFriendId}});
        console.log("deleting")
        return res.redirect('/');
        // return res.json(200,{
        //     message:"friend removed successfully",
        //     data:{
        //         toUser: toUser
        //     }
        // })
        

    }catch(err){
        console.log(err);
    }
}