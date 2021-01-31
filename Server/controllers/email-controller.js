// const express = require('express');
// // const EmailLogic = require('../business-logic/email-logic');
// const nodemailer = require('nodemailer');

// const router = express.Router();

// router.post('/', async (request, response, next) => {
//     try {
//         let transporter = nodemailer.createTransport({
//             // host: 'smtp.googlemail.com',
//             // port: 587,
//             // secure: false, // true for 465, false for other ports
//             service: 'gmail',
//             auth: {                
//                 user: 'info@lowpriceauction.com', // generated ethereal user
//                 pass: 'LPA123info'  // generated ethereal password
            
//             },
//             tls:{
//               rejectUnauthorized:false
//             }
//           });
        
//           // setup email data with unicode symbols
//           let mailOptions = {
//               from: 'LPA Projects', // sender address
//               to: `${request.body.email}`, // list of receivers
//               subject: `${request.body.subject}`, // Subject line
//               text: `${request.body.text}`, // plain text body
//             //   html: output // html body
//           };
        
//           // send mail with defined transport object
//           transporter.sendMail(mailOptions, (error, info) => {
//               console.log(mailOptions);
//               if (error) {
//                   return console.log(error);
//               }
//               if(info) {
//                   response.status(200).json({msg:'Email has been sent'});
//               }
//               console.log('Message sent: %s', info.messageId);   
//               console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
//           });

//     }
//     catch (err) {
//         response.status(500).send({ error: err.message });
//     }
// });


// module.exports = router;



const express = require("express");
const EmailLogic = require("../business-logic/email-logic");
const authLogic = require("./../business-logic/auth-logic");
const User = require("../models/user");

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const info = request.body;
    if (info.email && info.subject && info.text) {
      const email = new EmailLogic.EmailUtil();
      email.send(
        info.from? info.from : '"LPA Group" <LPA@LPA.com>',
        info.email,
        info.subject,
        info.text,
        function (err, result) {
          if (err) {
            next(err);
          }
          response.json({ ...result, msg: "Email Sent" });
        }
      );
    } else {
      response.json({ ...info, msg: "something is missing" });
    }
    // create reusable transporter object using the default SMTP transport
  } catch (err) {
    response.status(500).send({ error: err });
  }
});

router.get("/temp", async (req, res) => {
  const temp = new EmailLogic.emailTemplates();
  const result = await temp.setTemplate("whats up", "this is a test");
  res.send(result);
});
router.post("/sendReset", async (req, res, next) => {
  if (req.body.email) {
    console.log(req.body);
    const gToken = authLogic.SetUserToken(req.body.email, (err, tokenres) => {
      if (err) {
        return next(err);
      }
      console.log(gToken, tokenres);
      const email = new EmailLogic.EmailUtil();
      const url = `~/resetPassview/${gToken}`;
      const text = `<div>please let us make the diffreance<a href="${url}">link Email Confirmation</a></div>`;
      email.send(
        '"LPA Group" <LPA@LPA.com>',
        req.body.email,
        "Lap Email Confirmaition",
        text,
        (err, result) => {
          if (err) {
            next(err);
          }
          res.json({  msg: "Email Sent" });
        }
      );
    });
  } else {
    res.json({ msg: "no Emait was typed" });
  }
});
module.exports = router;
