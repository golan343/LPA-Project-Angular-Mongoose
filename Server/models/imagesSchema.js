const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    base64StringImg:{
        type:String
    },
    altered:{
        type:Date
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true,  "is missing."],
        unique:true 
    }
});
imageSchema.virtual("User", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});
const imageModel = mongoose.model('imageMdb',imageSchema,'ImagesData');

module.exports = imageModel;