
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
    user.password? user.password = hash(user.password) : '';
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
        phone: user.phone,
        birthDay: new Date(user.birthDay),
        street: user.street,
      },
    },
    { useFindAndModify: false }
  ).exec(callback);
}
function getUserImage(id,callback){
  User.findOne({_id:id}).select('img').exec(callback);
}
function saveUserImage(id,imgBase64,callback){
  User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        img:imgBase64 
      },
    },
    { useFindAndModify: false }
  ).exec(callback);
}
function findUserById(userId, callback) {
  User.find({ _id: userId }, callback);
}
function resetPass(id, password, callback) {
  User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        password: hash(password),
      },
    },
    { useFindAndModify: false }
  ).exec(callback);
}
function genrateRandomToken(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function SetUserToken(email, callback) {
  const update = {
    token: genrateRandomToken(6),
  };
  User.findOneAndUpdate(
    { email: new RegExp("^" + email + "$", "i") },
    update,
    function (err, doc) {
      //Do your action here..
      const foundUser = doc[0];
    }
  ).exec(callback);
  return update.token;
}

function searchUsersByFirstName(text) {
  return User.find({firstName: { $regex: text, $options: 'i'}}).exec();
}

function searchUserByEmail(email) {
  return User.findOne({email}).exec();
}

function searchUserByPhoneNumber(string) {
  return User.findOne({phone: string}).exec();
}

function sortUsers() {
  return User.find({}).sort({firstName: -1}).exec();
}

module.exports = {
  registerAsync,
  loginAsync,
  updateAsync,
  getAllUsers,
  deleteUser,
  adminUpdateUser,
  findUserById,
  resetPass,
  saveUserImage,
  getUserImage,
  SetUserToken,
  searchUsersByFirstName,
  searchUserByEmail,
  searchUserByPhoneNumber,
  sortUsers
};