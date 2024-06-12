const nodemailer = require("nodemailer");

const sendEmail = async (userEmail, subject, html) => {
    try {
        let transporter = nodemailer.createTransport({
            service: process.env.APP_SERVICE,
            auth: {
                user: process.env.APP_ADDRESS, // generated ethereal user
                pass: process.env.APP_PASSWORD, // generated ethereal password
            }
        });

        await transporter.sendMail({
            from: process.env.APP_ADDRESS, // sender address
            to: userEmail,
            subject: subject,
            html: html,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;