const express = require('express');
const info = require('./../models/info');
const router = express.Router();

router.get('/countries', async (req, res) => {
    try{
        const infoOb = new info()
        res.json(infoOb.getCounries())
    }catch{
        throw new Error('phoneCode json file not found');
    }

});
router.get('/phones-code', async (req, res) => {
    try{
        const infoOb = new info()
        res.json(infoOb.getPhoneCode())
    }catch{
        throw new Error('phoneCode json file not found');
    }
    
});
module.exports = router;