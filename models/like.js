const mongoose =require('mongoose');


const likeSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    likeable: { //this defines the object id of the liked object
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'   //dynamically decides the Schema to use as the reference

    },
    onModel: { // this field is used for defining the type of the liked object since this is a dynamic reference
        type: String,
        required : true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports=Like;