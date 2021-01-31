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
    });

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


router.get('/transaction', (request, response) => {
    try{
        const options = {
            "method": "GET",
            "hostname": "api-uat.kushkipagos.com",
            "port": null,
            "path": "/analytics/v1/transactions-list",
            "headers": { 'Private-Merchant-Id' : 'd357cc7ffa2f49058617233ce6f7db72' }
        };

        let req = http.request(options,  (res) => {
            const chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            console.log(chunks);
            res.on('end', function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
                response.json(body.toString());
            });
        })
          
        req.end();

    }
    catch(err){
        response.send(500).json(err.message);
    }
});
router.get('/smartlink/:link', (request, response) => {
    try{
        const smartLinkId = request.params.link;
        const options = {
            "method": "GET",
            "hostname": "api-uat.kushkipagos.com",
            "port": null,
            "path": "/smartlink/v2/smart-link/" + smartLinkId,
            "headers": { 'content-type': 'application/json'}
        };

        let req = http.request(options,  (res) => {
            const chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                const body = Buffer.concat(chunks).toString();
                const data = JSON.parse(body)
                response.json(data);
            });
            
            
        })
        
        req.end();

        

    }
    catch(err){
        response.send(500).json(err.message);
    }
});



module.exports = router;