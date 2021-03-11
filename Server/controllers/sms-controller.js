const express = require('express');

const router = express.Router();


router.post('/sendSMS', (request, response) => {
    try{
        const sms = request.body;
        const accountSid = "AC8cc097a21b9a77da75494450472f2689";
        const authToken = "bb3de23f68fee46da873a457513fe7d0";
        const twilio = require('twilio');
        const client  = new twilio(accountSid, authToken);
        client.messages
        .create({
            body: sms.body,
            to: sms.to,
            from: "LPA Group"

        })
        .then((message) => response.send(`send : ${message}`));
        
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});

// tYYJ0u3V8Wh8dCWW90y6uze3Ftz8njyA
module.exports = router;
