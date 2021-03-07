const Bid = require("../models/bid");
const Auction = require("../models/auction");

// get all bids
function getAllBidsAsync() {
  return Bid.find().populate("action").exec();
}
// get one bids by id
function getOneBidAsync(_id) {
  return Bid.findOne({ _id }).populate("action").exec();
}

//add new bid

async function addBidAsync(bid) {
  let auction = await Auction.find({ _id: bid.auctionId }).exec();
  auction = auction[0];
  auction.bidsCount = auction.bidsCount + 1;
  const info = await Auction.updateOne({ _id: auction._id }, auction).exec();
  info.n ? auction : null;
  return bid.save();
}

//update bid by id
async function updateBidAsync(bid) {
  const info = await Bid.updateOne({ _id: bid._id }, bid).exec();
  return info.n ? bid : null;
}

//delete bid by id

async function deleteBidAsync(_id) {
  return Bid.deleteOne({ _id }).exec();
}
function getAllBidsIncludingSpecificAuctionAsync(auctionId) {

  return Bid.find({ auctionId })
   // .populate("auctionId")
  //  .populate("userId")
    .exec();

}

module.exports = {

  getAllBidsAsync,
  getOneBidAsync,
  addBidAsync,
  updateBidAsync,
  deleteBidAsync,
  getAllBidsIncludingSpecificAuctionAsync,
};

