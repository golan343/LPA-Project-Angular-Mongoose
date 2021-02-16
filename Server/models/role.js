const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    _id: String,
    name: String,
    roleNum: Number
}, {
    versionKey: false
});

const Role = mongoose.model("Roles", RoleSchema, "roles");

module.exports = Role;