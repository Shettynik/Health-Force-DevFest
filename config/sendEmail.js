const sgMail = require('@sendgrid/mail');

const API_KEY = process.env.SEND_GRID_API_KEY

sgMail.setApiKey(API_KEY);

const sendEmail = (options) => {
    console.log(options)
    const message = {
    to:  options.to,
    from: process.env.SEND_GRID_EMAIL_FROM,
    subject: options.subject,
    html: options.text
};

sgMail.send(message).then(() => {
    console.log('Send email')
}).catch((error) => {
    console.log(error.message)
});
}

module.exports = sendEmail;