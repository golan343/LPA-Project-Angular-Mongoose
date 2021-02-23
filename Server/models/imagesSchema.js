const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    base64StringImg:{
        type:String
    },
    src:{
        type:String
    },
    userId:{
        type:String
    }
});
const imageModel = mongoose.model('imageMdb',imageSchema,'ImagesData');

module.exports = imageModel;