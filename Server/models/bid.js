const mongoose = require('mongoose');

// Bid Schema
const BidSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    auctionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action"
    },
    offer: {
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

BidSchema.virtual("action", {
    ref: "Action",
    localField: "actionId",
    foreignField: "_id",
    justOne: true
});
BidSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});


const Bid = mongoose.model("Bids", BidSchema, "bids");


module.exports = Bid;

