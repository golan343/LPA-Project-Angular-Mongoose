const mongoose = require('mongoose');

// Review Schema
const ReviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    actionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action"
    },
    rating: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    }
}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

ReviewSchema.virtual("action", {
    ref: "Action",
    localField: "actionId",
    foreignField: "_id",
    justOne: true
});
ReviewSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});


const Review = mongoose.model("Reviews", ReviewSchema, "reviews");


module.exports = Review;

