const nodemailer = require('nodemailer');

const mailer = async ( { to, subject, text } ) => {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'mohitagrawal.dev@gmail.com',
         pass: 'Test@123'
      }
  });
  
    const message = {
      from: 'mohitagrawal.dev@gmail.com',
      to: to,
      subject: subject,
      text: text
  };
  
    try {
      
      await transporter.sendMail( message );
      
      return true;
    } catch (error) {
      
      console.log(error);
      
      return false;
  
    }
  };
  
  module.exports = mailer;