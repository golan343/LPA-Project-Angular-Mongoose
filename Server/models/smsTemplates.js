const mongoose = require('mongoose');

const SmsTemplatesSchema = mongoose.Schema({
    text: String
}, {
    versionKey: false
});

const SmsTemplates = mongoose.model("SmsTemplates", SmsTemplatesSchema, "smsTemplates");

module.exports = SmsTemplates;