const express = require('express');
// const EmailLogic = require('../business-logic/email-logic');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', async (request, response, next) => {
    try {
        let transporter = nodemailer.createTransport({
            // host: 'smtp.googlemail.com',
            // port: 587,
            // secure: false, // true for 465, false for other ports
            service: 'gmail',
            auth: {                
                user: 'info@lowpriceauction.com', // generated ethereal user
                pass: 'LPA123info'  // generated ethereal password
            
            },
            tls:{
              rejectUnauthorized:false
            }
          });
        
          // setup email data with unicode symbols
          let mailOptions = {
              from: 'LPA Projects', // sender address
              to: `${request.body.email}`, // list of receivers
              subject: `${request.body.subject}`, // Subject line
              text: `${request.body.text}`, // plain text body
            //   html: output // html body
          };
        
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              console.log(mailOptions);
              if (error) {
                  return console.log(error);
              }
              if(info) {
                  response.status(200).json({msg:'Email has been sent'});
              }
              console.log('Message sent: %s', info.messageId);   
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
          });

    }
    catch (err) {
        response.status(500).send({ error: err.message });
    }
});


module.exports = router;