const express = require('express');
// const Auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const authLogic = require('../business-logic/auth-logic');
const errorHandler = require("../helpers/error-handler");
const User = require('../models/user');
// const reCaptcha = require('express-recaptcha');


const router = express.Router();

// router.get("/captcha", (request, response) => {
//     const captcha = reCaptcha;

// });

router.post("/register", async (request, response) => {
    try{
        const user = new User(request.body);

        const error = await user.validate();
        if(error){
            console.log(error);
            response.status(400).send(error.message);
            return;
        }

        const addedUser = await authLogic.registerAsync(user);
        
        
        const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: "30m" });
        request.session.user = addedUser;
        addedUser.password = undefined;
        response.status(201).json({ addedUser, token });
        
    }
    catch(err){
        console.log(err);
        response.status(500).send(errorHandler.getError(err));
    }

});


router.post("/login", async (request, response) => {
    try{
        const user = await authLogic.loginAsync(request.body);
        if(!user) {
            response.status(401).send("Incorrect email or password");
            return;
        }

        const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: "30m" });
        user.password = undefined;
        request.session.user = user;
        console.log("success login");
        response.json({ user, token });
    }
    catch(err){
        response.status(500).send(errorHandler.getError(err));
    }

});


router.post("/logout", (request, response) => {
    try{
        request.session.destroy();
        response.end();
        console.log("success logout");
    }
    catch(err){

    }
});



module.exports = router;