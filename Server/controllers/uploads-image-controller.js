const { Console } = require('console');
const express = require('express');
const fs = require('fs');
const router = express.Router();



if(!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

router.post("/upload-image", (request, response) => {
    console.log(request.files);
    if(!request.files) {
        response.status(400).json({msg:"No file sent"});
        return;
    }
    const image = request.files.image;

    const extension = image.name.substr(image.name.lastIndexOf("."));

    if(extension != ".jpg" && extension != ".png") {
        response.status(400).json({msg:"Illegal file sent"});
        return;
    }
 
    image.mv("./uploads/" + image.name);

    response.end();

});

module.exports = router;