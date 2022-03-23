const mongoose= require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // the objectId in robot3T
        ref:'User'
    },
    //include the array of ids of all comments in this post schema
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, // the objectId in robot3T
            ref:'Comment'
        }
    ]
},
    {     
        timestamps: true
    });

const Post= mongoose.model('Post', postSchema);
module.exports= Post;