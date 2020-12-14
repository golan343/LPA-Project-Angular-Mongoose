const mongoose = require('mongoose');

// Rule Schema
const RuleSchema = mongoose.Schema({
    description: {
        type: String,
        required: [true, 'is missing']
    },
    createdBy: {
        type: mongoose.Schema.Types.String,
        ref: "User"
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

RuleSchema.virtual("user", {
    ref: "User",
    localField: "createdBy",
    foreignField: "_id",
    justOne: true
});



const Rule = mongoose.model("Rules", RuleSchema, "rules");


module.exports = Rule;

