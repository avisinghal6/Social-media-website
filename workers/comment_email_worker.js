const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails', function(job, done){ //'job' here is the data (comment)
    console.log('emails worker is processing a job', job.data);

    commentsMailer.newComment(job.data); //calling the function to generate the mails

    done();
})