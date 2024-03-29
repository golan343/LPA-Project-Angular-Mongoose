const mongoose = require('mongoose');

// Bid Schema
const BidSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true,  "is missing."]
    },
    auctionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auction",
        required: [true,  "is missing."]
    },
    offer: {
        index: true,
        required: [true,  "is missing."],
        type: String
    },
    date: {
        required: [true,  "is missing."],
        type: String
    },
    isWinner:{
        type:Boolean
    }
}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

BidSchema.virtual("auction", {
    ref: "Auction",
    localField: "auctionId",
    foreignField: "_id",
    justOne: true
});
BidSchema.virtual("user", {
    ref: "User._id",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});


const Bid = mongoose.model("Bids", BidSchema, "bids");


module.exports = Bid;

