const mongoose = require('mongoose');

// Auction Schema
const AuctionSchema = mongoose.Schema({
    name: {
        type: String
    },
    winPrice: {
        type: String
    },
    youtubeId: {
        type: String
    },
    avgRating: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    imageFileName: {
        type: String
    },
    price: {
        type: String

    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    },
    createdDate: {
        type: Date
    },
    minOffer: {
        type: Number

    },
    maxOffer: {
        type: Number

    },
    totalBids: {
        type: Number

    },
    bidPattern: {
        type: String
    },
    bidPrice: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    siteId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site"
    },
    ruleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rule"
    }
    
}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

AuctionSchema.virtual("rule", {
    ref: "Rule",
    localField: "ruleId",
    foreignField: "_id",
    justOne: true
});
AuctionSchema.virtual("site", {
    ref: "Site",
    localField: "siteId",
    foreignField: "_id",
    justOne: true
});
AuctionSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});


const Auction = mongoose.model("Auction", AuctionSchema, "auctions");


module.exports = Auction;

