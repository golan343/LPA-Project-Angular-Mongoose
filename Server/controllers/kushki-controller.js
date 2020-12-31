const express = require('express');
const http = require('https');

const router = express.Router();


router.post('/',(request, response) => {
    try{   
        console.log('test');
        console.log(request.body);

        //--------------------
        const options = {
        "method": "POST",
        "hostname": "api-uat.kushkipagos.com",
        "port": null,
        "path": "/card/v1/tokens",
        "headers": {
          "content-type": "application/json"
        }
    };
    const req = http.request(options, function (res) {
        let chunks = [];

        res.on('data', function (chunk) {
            chunks.push(chunk);
        });

        res.on('end', function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
            response.send(body.toString());
        });
    })

    req.write(JSON.stringify({
        card: {
            name: `${request.body.name}`,
            number: `${request.body.number}`,
            expiryMonth: `${request.body.expiryMonth}`,
            expiryYear: `${request.body.expiryYear}`,
            cvv: `${request.body.cvv}`
        },
        totalAmount: request.body.totalAmount,
        currency: 'USD'
    }));
    req.end();
        
    }
    catch(err){ response.send(500).json(err)}
    
    

});


module.exports = router;