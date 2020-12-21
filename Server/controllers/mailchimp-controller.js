const express = require('express');
const mc = require('./mailchimp/addSubscribe');
const router = express.Router();


router.post('/subscribe', (request, response) => {
    mc.addSubscriber(request.body.email, { fname: request.body.fname, lname: request.body.lname}).then(m => {
        response.json({
            formValues: request.body,
            md: {
                errors: m.errors,
                total_created: m.total_created,
                total_updated: m.total_updated,
                error_count: m.error_count,
            }
        });
    });
});



module.exports = router;