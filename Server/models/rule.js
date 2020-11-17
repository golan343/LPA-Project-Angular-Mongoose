const mongoose = require('mongoose');

// Rule Schema
const RuleSchema = mongoose.Schema({
    description: {
        type: String
    },
    minOffer: {
        type: String
    },
    maxOffer: {
        type: String
    },
    
    totalBids: {
        type: String
    },
    bidPattern: {
        type: String
    },
    bidPrice: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.String,
        ref: "UserName"
    },
}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

RuleSchema.virtual("user", {
    ref: "UserName",
    localField: "createdBy",
    foreignField: "name",
    justOne: true
});
RuleSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});


const Rule = mongoose.model("Rules", RuleSchema, "rules");


module.exports = Rule;

