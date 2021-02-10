const Auction = require('../models/auction');

// get all auctions
function getAllAuctionsAsync() {
    return Auction.find({isActive:false}).populate('rule').populate('site').populate('createdBy').exec();
}
function getAllAuction(callback) {
  return Auction.find({isActive:true}).exec(callback);
}
// get all closed auctions
function getAllClosedAuctionsAsync() {
    return Auction.find({status: false,isActive:false}).exec();
}
// get all closed auctions
function getLastAuctionAsync() {
    return Auction.find().sort({ '_id': -1 }).limit(1);
}
// get all opened auctions
function getAllOpenedAuctionsAsync() {
    return Auction.find({status: true,isActive:false}).exec();
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

function addAuctionAsync(auction) {
    return auction.save();
}

//update auction by id
async function updateAuctionAsync(auction) {
    const info = await Auction.updateOne({ _id: auction._id }, auction).exec();
    return info.n ? auction : null;
}

//delete auction by id

async function deleteAuctionAsync(_id) {
    return Auction.deleteOne({ _id }).exec();
}

function setAuctionToArcaiv(id,callback){
    if(typeof callback == 'function'){
        const result =  Auction.findByIdAndUpdate({_id:id},{isActive:false},callback);
        return result;
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
  setAuctionToArcaiv
};
