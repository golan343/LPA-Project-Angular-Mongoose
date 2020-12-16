const express = require('express');
const errorHandler = require('../helpers/error-handler');
const nodemailer = require("nodemailer");

const router = express.Router();

router.post('/', async (request, response) => {
    try{
        const info = request.body;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        //   host: "smtp.ethereal.email",
        //   port: 587,
        //   secure: false, // true for 465, false for other ports
            service: 'gmail', 
            auth: {
                user: 'golanstudys@gmail.com', // generated ethereal user
                pass: 'Thyrfing054', // generated ethereal password
            },
        });
        let mailOptions = {
            from: '"LPA Group" <LPA@LPA.com>', // sender address
            to: `${info.email}`, // list of receivers
            subject: `${info.subject}`, // Subject line
            text: `${info.text}`, // plain text body
        }
      
        transporter.sendMail(mailOptions, function (err, info) {
            if(err){
                console.log(err);
            }
            else{
                console.log(info);
            }
        });
        response.send('email send');

    }
    catch(err){
        response.status(500).send(errorHandler.getError(err));
    }
})

module.exports = router;