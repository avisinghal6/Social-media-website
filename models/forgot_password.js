const mongoose= require('mongoose');

const forgotPasswordSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken: {
        type: 'String', 
    },
    is_Valid: {
        type: 'String'
    }
},{
    timestamps: true
});

const ForgotPassword= mongoose.model('forgotPassword', forgotPasswordSchema);
module.exports= ForgotPassword;