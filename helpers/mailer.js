const nodemailer = require('nodemailer');

const mailer = (reciever, link) => {

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'parkingapp.diaz@gmail.com',
        pass: 'MamaMia123'
    }
});

let mailOptions = {
    from: 'parkingapp.diaz@gmail.com',
    to: reciever,
    subject: 'This is Your QRCode',
    text: link
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
});
}

module.exports = mailer