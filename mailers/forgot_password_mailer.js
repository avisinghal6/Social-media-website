const nodemailer= require('../config/nodemailer');

// this is another way of exporting a method
exports.newPassword= (forgotPasswordToken) => {
    let htmlString= nodemailer.renderTemplate({forgotPasswordToken: forgotPasswordToken}, '/forgotpassword/forgot_password.ejs');

    nodemailer.transporter.sendMail({
        from: "codeial",
        to: forgotPasswordToken.user.email,
        subject: "new password request",
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