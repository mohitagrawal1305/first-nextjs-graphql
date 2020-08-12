const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: 'mohitagrawal.dev@gmail.com',
       pass: 'Test@123'
    }
});

const token = Math.floor(100000 + Math.random() * 900000);

const message = {
    from: 'mohitagrawal.dev@gmail.com',
    to: 'mohitagrawal1305@gmail.com',
    subject: 'OTP',
    text: `Your OTP is ${ token }`
};
transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
});