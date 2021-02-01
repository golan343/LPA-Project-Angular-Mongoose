const { Console } = require('console');
const express = require('express');
const fs = require('fs');
const router = express.Router();



if(!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

router.post("/upload-image", (request, response) => {
   
    if(!request.files) {
        response.status(400).json({msg:"No file sent"});
        return;
    }
    const file = request.files.file;
    console.log(file)
    if(file.size> 700019){
        response.status(301).json({msg:"The File is too Large"});
        return;
    }
    switch (file.mimetype) {
        case "image/png":
        case "image/jpeg":
        case "image/jpg":
        case "image/gif":
        case "image/webp":
       file.mv('./uploads/'+file.name);
       response.json({msg:'file uploaded successfuly'});
       break;
       default:
        response.status(300).json({msg:'file of type '+file.mimetype+' Not Allowed!'});
        return;
      }

    response.end();

});

module.exports = router;