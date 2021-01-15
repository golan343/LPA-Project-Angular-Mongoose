// const Auth = require('../models/auth');
const hash = require('../helpers/hash');
const User = require('../models/user');


function registerAsync(user) {
    user.password = hash(user.password);
    return user.save();
}
function getAllUsers(callback) {
    User.find({}, callback);
};

function loginAsync(credentials) {
    credentials.password = hash(credentials.password);
    return User.findOne({ email: credentials.email, password: credentials.password }).exec();
}
async function updateAsync(user) {
    user.password = hash(user.password);
    const info = await User.updateOne({_id: user._id }, user).exec();
    return info.n ? user : null;
}

async function deleteUser(id) {
  const result = await User.find({ _id: id }).deleteOne().exec();
  return result;
}
function adminUpdateUser(user, callback) {
  User.findByIdAndUpdate(
    { _id: user._id },
    {
      $set: {
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        city: user.city,
        email: user.email,
        birthDay: new Date(user.birthDay),
        street: user.street,
      },
    },
    { useFindAndModify: false }
  ).exec(callback);
}
module.exports = {
  registerAsync,
  loginAsync,
  updateAsync,
  getAllUsers,
  deleteUser,
  adminUpdateUser,
};