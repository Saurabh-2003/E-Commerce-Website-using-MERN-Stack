const nodemailer = require("nodemailer");

const sendEmail = async(options) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'saurabhthapliyal20011682@gmail.com',
            pass: 'ikgd zskr zgtn uiit'
        }
    });
     
    let mailDetails = {
        from: process.env.SMTP_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
     
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports = sendEmail