const express = require('express');
const bidsLogic = require('../business-logic/bids-logic');
const errorHandler = require('../helpers/error-handler');
const Bid = require('../models/bid');

const router = express.Router();

//get all bids - /api/bids
router.get('/', async (request, response) => {
    try{
        const bids = await bidsLogic.getAllBidsAsync();
        response.json(bids);
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});

//get one bid by id - /api/bid/id
router.get('/:id', async (request, response) => {
    try{
        const _id = request.params._id;
        const bid = await bidsLogic.getOneBidAsync(_id);
        if(!bid){
            response.sendStatus(404);
            return;
        }
        response.json(bid);
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});

//add bid - /api/bid
router.post('/', async (request, response) => {
    try{
        const bid = new Bid(request.body);
        
        //validate bid
        const error = await bid.validate();
        if(error) {
            response.status(400).send( { error: error });
            return;
        }

        const addedBid = await bidsLogic.addBidAsync(bid);
        response.status(201).json(addedBid);
        
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});


//update full bid - /api/bid/id
router.put('/:_id', async (request, response) => {
    try{
        const bid = new Bid(request.body);
        bid._id = request.params._id;

        //validate
        const error = bid.validateSync();
        if(error) {
            response.status(400).send( { error: error });
            return;
        }

        const updateBid = await bidsLogic.updateBidAsync(bid);
        if(!updateBid) {
            response.sendStatus(404);
            return;
        }
        response.json(updateBid);
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});

//update partial bid info - /api/bid/id
router.patch('/:_id', async (request, response) => {
    try{
        const bid = new Bid(request.body);
        bid._id = request.params._id;

        //validate
        const error = bid.validateSync();
        if(error) {
            response.status(400).send( { error: error });
            return;
        }

        const updateBid = await bidsLogic.updateBidAsync(bid);
        if(!updateBid) {
            response.sendStatus(404);
            return;
        }
        response.json(updateBid);
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});

//delete bid - /api/bid/id

router.delete('/:id', async(request,response) => {
    try{
        const _id = request.params._id;
        await bidsLogic.deleteBidAsync(_id);
        response.sendStatus(204);
    }
    catch(err){
        response.status(500).send( { error: err });
    }
})

router.get('/join/bids-in-auction/:auctionId', async (request, response) => {  
    try{
        const auctionId = request.params.auctionId;
        const bids = await bidsLogic.getAllBidsIncludingSpecificAuctionAsync(auctionId);
        if(!bids){
            response.sendStatus(404);
            return;
        }
        response.json(bids);
    }
    catch(err){
        response.status(500).send( { error: err });
    }

});

module.exports = router;