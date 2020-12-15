// const Auth = require('../models/auth');
const hash = require('../helpers/hash');
const User = require('../models/user');


function registerAsync(user) {
    user.password = hash(user.password);
    return user.save();
}


function loginAsync(credentials) {
    credentials.password = hash(credentials.password);
    return User.findOne({ email: credentials.email, password: credentials.password }).exec();
}
async function updateAsync(user) {
    user.password = hash(user.password);
    const info = await User.updateOne({_id: user._id }, user).exec();
    return info.n ? user : null;
}

module.exports = {
    registerAsync,
    loginAsync,
    updateAsync
}