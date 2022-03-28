const nodemailer= require('nodemailer');
const ejs= require('ejs');
const path= require('path');


// this part defines who is going to send the emails
let transporter= nodemailer.createTransport({
    service: 'gmail',
    host: 'smptp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: '',
        pass: ''//fill in the password for the username but dont push to github
    }
});

let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailes', relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template');
                return;
            }

            mailHTML= template;
        }
    )

    return mailHTML;

}

module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}