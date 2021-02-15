const express = require('express');
const roleLogic = require('../business-logic/roles-logic');

const router = express.Router();


router.get('/', async (request, response) => {
    try{
        const roles = await roleLogic.getAllRolesAsync();

        response.status(200).json(roles);
    }
    catch(err){
        response.status(500).json({error: err.message});
    }
});

module.exports = router;