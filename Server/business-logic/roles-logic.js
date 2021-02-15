const Role = require('../models/role');

function getAllRolesAsync() {
    return Role.find().exec();
}

module.exports = {
    getAllRolesAsync
}