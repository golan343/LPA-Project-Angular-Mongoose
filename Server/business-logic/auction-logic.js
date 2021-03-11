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
  return Auction.find({ status: false, isActive: true }).exec();
}
// get all closed auctions
function getLastAuctionAsync() {
  return Auction.find({  status: true, isActive: true }).limit(1);
}
// get all opened auctions
function getAllOpenedAuctionsAsync() {
  return Auction.find({ status: true, isActive: true }).exec();
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

async function addAuctionAsync(arg) {
  try {
    arg.bidPattern = arg.bidPattern || 0.5;
    arg.bidsCount = 0;
    arg.isActive = true;
    arg.createdDate = new Date();
    const auction = new Auction(arg);
    
    //validate auction
    const error = await auction.validate();
    if (error) {
      return error;
    }
    return auction.save();
  } catch (e) {
    throw new Error('error tring to add new auction '+JSON.stringify(e));
  }
}

//update auction by id
async function updateAuctionAsync(auction) {
  const info = await Auction.updateOne({ _id: auction._id }, auction).exec();
  return info.n ? auction : null;
}

//delete auction by id

async function deleteAuctionAsync(_id) {
  if (ObjectId.isValid(_id)) {
    let bidDelRes = {};
    let auctionDelRes = await  Auction.deleteOne({ _id }).exec();
    if(auctionDelRes.deletedCount>0){
      bidDelRes = await Bid.deleteMany({auctionId:_id}).exec();
    }
    return {bidDelRes,auctionDelRes};
  }
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
