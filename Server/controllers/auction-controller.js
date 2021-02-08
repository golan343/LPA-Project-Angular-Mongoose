const express = require('express');
const auctionLogic = require('../business-logic/auction-logic');
const Auction = require('../models/auction');
const fs = require('fs');
const router = express.Router();

//get all auctions - /api/auctions
router.get('/', async (request, response) => {
    try{
        const auctions = await auctionLogic.getAllAuctionsAsync();
        for(let auc of auctions){
            if(auc.createdBy){
                auc.createdBy.password = '';
                auc.createdBy.email = '';
            }
        }
        response.json(auctions);
    }
    catch(err){
        
        response.status(500).send( { error: err });
    }
});
router.get("/all", (req, res, next) => {
  const all = auctionLogic.getAllAuction((err, auctionsRes) => {
    if (err) {
      return next(err);
    }
  
    res.send(auctionsRes);
  });
});
// get all closed auction 
router.get('/get/closed', async (request, response) => {
    try{
        const auctions = await auctionLogic.getAllClosedAuctionsAsync();
        response.json(auctions);
    }
    catch(err){
        
        response.status(500).send( { error: err });
    }
});

// get all opened auction 
router.get('/get/opened', async (request, response) => {
    try{
        const auctions = await auctionLogic.getAllOpenedAuctionsAsync();
        response.json(auctions);
    }
    catch(err){
        
        response.status(500).send( { error: err });
    }
});

//get one auction by id - /api/auctions/id
router.get('/:_id', async (request, response) => {
    try{
        const _id = request.params._id;
        const auction = await auctionLogic.getOneAuctionAsync(_id);
        if(!auction){
            response.sendStatus(404);
            return;
        }
        response.json(auction);
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});
router.get('/get/last', async (request, response) => {
    try{
        const auction = await auctionLogic.getLastAuctionAsync();
        response.json(auction);
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});

//add one auction - /api/auctions
router.post('/', async (request, response) => {
    try{
        request.body.isActive = true;
        const auction = new Auction(request.body);
        //validate auction
        const error = await auction.validate();
        if(error) {
            response.status(400).send( { error: error });
            return;
        }

        const addedAuction = await auctionLogic.addAuctionAsync(auction);
        response.status(201).json(addedAuction);
        
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});


//update full auction - /api/products/id
router.put('/:_id', async (request, response) => {
    try{
        request.body.isActive = true;
        const auction = new Auction(request.body);
        auction._id = request.params._id;
        console.log(request.body);
        if(request.body.previousImage){
            /// remove previous auction image file
            fs.unlink('./upload/'+request.body.previousImage,function(err, fr){
                console.log(err,request.body.previousImage);
                console.log(fr);
            });
        }
        
        //validate
        const error = auction.validateSync();
        if(error) {
            response.status(400).send( { error: error });
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
        response.status(500).send( { error: err });
    }
});

//update partial auction info - /api/products/id
router.patch('/:_id', async (request, response) => {
    try{
        request.body.isActive = true;
        const auction = new Auction(request.body);
        auction._id = request.params._id;

        //validate
        const error = auction.validateSync();
        if(error) {
            response.status(400).send( { error: error });
            return;
        }
        console.log(request.body);
        if(request.body.previousImage){
            /// remove previous auction image file
            fs.unlink('./uploads/'+request.body.previousImage,function(err, fr){
                console.log(err,request.body.previousImage);
                console.log(fr);
            });
        }
        const updateAuction = await auctionLogic.updateAuctionAsync(auction);
        if(!updateAuction) {
            response.sendStatus(404);
            return;
        }
        response.json({msg:'auction Was saved successfuly'});
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});

//delete auction - /api/auctions/id

router.delete('/:_id', async (request, response) => {
    try {
        const _id = request.params._id;
        const result = await auctionLogic.deleteAuctionAsync(_id);
        response.json(result);
    }
    catch (err) {
        response.status(500).send({ error: err });
    }
});

router.put('/setarcive/:_id',async (req,res)=>{
    if(req.body.id){
        const id = req.params._id;
        console.log(id);
        auctionLogic.setAuctionToArcaiv(id,function(err, result) {
            if (err) {
              res.status(401).json(err);
            } else {
              res.json(result);
            }
          });
    }
});

module.exports = router;