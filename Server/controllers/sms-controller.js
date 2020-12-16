const express = require('express');
const errorHandler = require('../helpers/error-handler');

const router = express.Router();


router.get('/sendSMS', (request, response) => {
    try{
        const accountSid = "AC8cc097a21b9a77da75494450472f2689";
        const authToken = "bb3de23f68fee46da873a457513fe7d0";
        const twilio = require('twilio');
        const client  = new twilio(accountSid, authToken);
        client.messages
        .create({
            body: "Gishim",
            to: '+972547072070',
            from: "+12515727644"

        })
        .then((message) => response.send('send'));
        
    }
    catch(err){
        response.status(500).send(errorHandler.getError(err));
    }
});

// tYYJ0u3V8Wh8dCWW90y6uze3Ftz8njyA
module.exports = router;
