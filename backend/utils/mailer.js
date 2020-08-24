const nodemailer = require('nodemailer');

const mailer = async ( { to, subject, text } ) => {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL,
         pass: process.env.EMAIL_PASSWORD
      }
  });
  
    const message = {
      from: `"Mohit Agrawal 👻" <${ process.env.EMAIL }>`,
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