const Auction = require('../models/auction');

// get all auctions
function getAllAuctionsAsync() {
    return Auction.find().exec();
}

// get one auction by id
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


module.exports = {
    getAllAuctionsAsync,
    getOneAuctionAsync,
    addAuctionAsync,
    updateAuctionAsync,
    deleteAuctionAsync
}
