const mongoose =require('mongoose');
const multer= require('multer');
const path= require('path'); 
const AVATAR_PATH= path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    friendships: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship' 
        }
    ]
}, {
    timestamps: true
});


let storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+ '-'+Date.now()); //every file will be stored with the fieldname "avatar" as defined in the schema
    }
});

// static methods
userSchema.statics.uploadedAvatar= multer({ storage:storage}).single('avatar'); //single indicates that only one file will be stored for avatar not multiple files
userSchema.statics.avatarPath= AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports =User;