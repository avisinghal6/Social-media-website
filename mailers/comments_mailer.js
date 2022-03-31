const nodemailer= require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment= (comment) => {
    let htmlString= nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: "codeial",
        to: comment.user.email,
        subject: "new comment posted",
        html: htmlString
    }, (err,info) =>{
        if(err){
            console.log('error in sending mail',err);
        return;
        }
        console.log("message sent", info);
        return;
    });
}