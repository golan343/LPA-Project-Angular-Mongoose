const Rule = require('../models/rule');

function getAllRulesAsync() {
    return Rule.find().populate('user').exec();
}
function getRuleAsync(_id) {
    return Rule.find({ _id }).populate('user').exec();
}

function addRuleAsync(rule) {
    return rule.save();
}

function updateRuleAsync(rule) {
    const info = await Rule.updateOne({ _id: rule._id }, rule).exec();
    return info.n ? rule : null;
}

function deleteRuleAsync(_id) {
    return Rule.deleteOne({ _id }).exec();
}

module.exports = {
    getAllRulesAsync,
    getRuleAsync,
    addRuleAsync,
    updateRuleAsync,
    deleteRuleAsync
}