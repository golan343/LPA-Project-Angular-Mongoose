const mongoose = require('mongoose');

// Promotion Schema
const PromotionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    credits: {
        type: String
    },
    activated: {
        type: String
    },
    date: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.String,
        ref: "UserName"
    },
    date: {
        type: String
    }
}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

PromotionSchema.virtual("user", {
    ref: "UserName",
    localField: "createdBy",
    foreignField: "name",
    justOne: true
});
PromotionSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});


const Promotion = mongoose.model("Promotions", PromotionSchema, "promotions");


module.exports = Promotion;

