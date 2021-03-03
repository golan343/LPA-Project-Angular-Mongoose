const { Types } = require("mongoose");
const Auction = require("../models/auction");
const Bid = require("../models/bid");
const ObjectId = Types.ObjectId;
// get all auctions
function getAllAuctionsAsync() {
  return Auction.find({ isActive: true })
    .populate("rule")
    .populate("site")
    .populate("createdBy")
    .exec();
}
function getAllAuction(callback) {
  return Auction.find({ isActive: true }).exec(callback);
}
// get all closed auctions
function getAllClosedAuctionsAsync() {
  return Auction.find({ status: false, isActive: false }).exec();
}
// get all closed auctions
function getLastAuctionAsync() {
  return Auction.find().sort({ _id: -1 }).limit(1);
}
// get all opened auctions
function getAllOpenedAuctionsAsync() {
  return Auction.find({ status: true, isActive: false }).exec();
}

// get one auction by id
function getOneAuctionAsync() {
  return Auction.findOne({ _id }).exec();
}

// get last auction
function getOneAuctionAsync(_id) {
  return Auction.findOne({ _id }).exec();
}

//add new auction

async function addAuctionAsync(auction) {
  try {
    const auction = new Auction(auction);
    //validate auction
    const error = await auction.validate();
    if (error) {
      return error;
    }
    return auction.save();
  } catch (e) {
    throw e;
  }
}

//update auction by id
async function updateAuctionAsync(auction) {
  const info = await Auction.updateOne({ _id: auction._id }, auction).exec();
  return info.n ? auction : null;
}

//delete auction by id

async function deleteAuctionAsync(_id) {
  if (ObjectId.isValid(_id)) return Auction.deleteOne({ _id }).exec();
  return new Promise((reject) => {
    return reject();
  });
}

function setAuctionToArcaiv(id, callback) {
  if (typeof callback == "function") {
    const result = Auction.findByIdAndUpdate(
      { _id: id },
      { isActive: false },
      callback
    );
    return result;
  }
}
function getUsersAuctionsInfo(id, callback) {
  try {
    if (ObjectId.isValid(id)) {
      return Bid.find({ userId: id })
        .populate("auction", "", "", { status: true, isActive: true })
        .exec(callback);
    }
    return new Promise(callback);
  } catch (e) {
    throw e;
  }
}
module.exports = {
  getAllAuctionsAsync,
  getOneAuctionAsync,
  addAuctionAsync,
  updateAuctionAsync,
  deleteAuctionAsync,
  getAllClosedAuctionsAsync,
  getAllOpenedAuctionsAsync,
  getLastAuctionAsync,
  getAllAuction,
  setAuctionToArcaiv,
  getUsersAuctionsInfo,
};
