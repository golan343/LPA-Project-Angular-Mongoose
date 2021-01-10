const express = require('express');
const info = require('./../models/info');
const router = express.Router();

router.get('/countries', async (req, res) => {
    
    const infoOb = new info()
    console.log(infoOb);
    res.json(infoOb.getCounries())
});
module.exports = router;