const jwt = require('jsonwebtoken');


function verifyLoggedIn(request, response, next) {
    if(!request.headers.authorization) {
        response.status(401).send("you are not logged in!");
        return;
    }

    const token = request.headers.authorization.spit(" ")[1];

    // if there is not token
    if(!token) {
        response.status(401).send("you are not logged in!");
        return;
    }

    //verify token
    jwt.verify(token, config.jwt.secretKey, (err, payload) => {
        console.log(payload.user);

        //if token expired or not token
        if(err){
            if(err.message === "jwt expired") {
                response.status(403).send("your login session has expired");
                return;
            }
            response.status(401).send("you are not logged in!");
            return;
        }

        //token legal
        next();
    });

};

module.exports = verifyLoggedIn;