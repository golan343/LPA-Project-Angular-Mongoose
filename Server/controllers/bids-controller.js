const express = require('express');
const auctionLogic = require('../business-logic/auction-logic');
const errorHandler = require('../helpers/error-handler');
const Bid = require('../models/bid');

const router = express.Router();

//get all bids - /api/bids
router.get('/', async (request, response) => {
    try{
        const bids = await auctionLogic.getAllAuctionsAsync();
        response.json(auctions);
    }
    catch(err){
        response.status(500).send(errorHandler.getError(err));
    }
});

//get one auction by id - /api/auctions/id
router.get('/:id', async (request, response) => {
    try{
        const _id = request.params._id;
        const auction = await auctionLogic.getOneAuctionsAsync(_id);
        if(!auction){
            response.sendStatus(404);
            return;
        }
        response.json(auction);
    }
    catch(err){
        response.status(500).send(errorHandler.getError(err));
    }
});

//add one auction - /api/auctions
router.post('/', async (request, response) => {
    try{
        const auction = new Auction(request.body);
        
        //validate auction
        const error = Auction.validateAsync();
        if(error) {
            response.status(400).send(error.message);
            return;
        }

        const addedAuction = await auctionLogic.addAuctionAsync(auction);
        response.status(201).json(addedAuction);
        
    }
    catch(err){
        response.status(500).send(errorHandler.getError(err));
    }
});


//update full auction - /api/products/id
router.put('/:_id', async (request, response) => {
    try{
        const auction = new Auction(request.body);
        auction._id = request.params._id;

        //validate
        const error = auction.validateSync();
        if(error) {
            response.status(400).send(error.message);
            return;
        }

        const updateAuction = await auctionLogic.updateAuctionAsync(auction);
        if(!updateAuction) {
            response.sendStatus(404);
            return;
        }
        response.json(updateAuction);
    }
    catch(err){
        response.status(500).send(errorHandler.getError(err));
    }
});

//update partial auction info - /api/products/id
router.patch('/:_id', async (request, response) => {
    try{
        const auction = new Auction(request.body);
        auction._id = request.params._id;

        //validate
        const error = auction.validateSync();
        if(error) {
            response.status(400).send(error.message);
            return;
        }

        const updateAuction = await auctionLogic.updateAuctionAsync(auction);
        if(!updateAuction) {
            response.sendStatus(404);
            return;
        }
        response.json(updateAuction);
    }
    catch(err){
        response.status(500).send(errorHandler.getError(err));
    }
});

//delete auction - /api/auctions/id

router.delete('/:id', async(request,response) => {
    try{
        const _id = request.params._id;
        await auctionLogic.deleteAuctionAsync(_id);
        response.sendStatus(204);
    }
    catch(err){
        response.status(500).send(errorHandler.getError(err));
    }
})

module.exports = router;