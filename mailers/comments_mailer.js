const nodemailer= require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment= (Comment) => {
    console.log('inside new comment mailer');

    nodemailer.transporter.sendMail({
        from: "codeial",
        to: Comment.user.email,
        subject: "new comment posted",
        html: '<h1> comment is now published</h1>'
    }, (err,info) =>{
        if(err){
            console.log('error in sending mail',err);
        return;
        }
        console.log("message sent", info);
        return;
    });
}