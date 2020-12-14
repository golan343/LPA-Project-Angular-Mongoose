const mongoose = require('mongoose');

// Rule Schema
const RuleSchema = mongoose.Schema({
    description: {
        type: String,
        required: [true, 'is missing']
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


const Rule = mongoose.model("Rules", RuleSchema, "rules");


module.exports = Rule;

