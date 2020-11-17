const Bid = require('../models/bid');

// get all bids
function getAllBidsAsync() {
    return Bid.find().exec();
}
// get one bids by id
function getOneBidAsync(_id) {
    return Bid.findOne({ _id }).exec();
}

//add new bid 

function addBidAsync(bid) {
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
function getAllBidsIncludingSpecificAuctionAsync() {
    return Bid.find().populate('auctions').exec();
}


module.exports = {
    getAllBidsAsync,
    getOneBidAsync,
    addBidAsync,
    updateBidAsync,
    deleteBidAsync,
    getAllBidsIncludingSpecificAuctionAsync
}
