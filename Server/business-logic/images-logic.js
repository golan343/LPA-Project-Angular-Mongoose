const { options } = require("../controllers/bids-controller");
const imageModel = require("../models/imagesSchema");

function getUserImage(id, callback) {
  imageModel.findOne({ userId: id }).select("base64StringImg").exec(callback);
}
////
//save image if dosn't exist 
//otherwise update user base64 image
////
function saveUserImage(id, imgBase64, callback) {
 // const options = { upsert: true, new: true, setDefaultsOnInsert: true };
 imageModel.findOneAndUpdate(
    { userId: id, base64StringImg: imgBase64, src: "" },
    {
      base64StringImg: imgBase64,
    },
    { upsert: true },
    callback
  );
}


module.exports = {
  saveUserImage,
  getUserImage,
};
