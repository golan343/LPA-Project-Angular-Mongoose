const express = require('express');
const bidsLogic = require('../business-logic/bids-logic');
const Bid = require('../models/bid');
const userLogic = require('../business-logic/auth-logic');
const auctionLogic = require('../business-logic/auction-logic');
const verifyLogin = require('../middleware/verify-logged-in');
const fetch = require('node-fetch');

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
router.post('/',  async (request, response) => {
    try{
        const bid = new Bid(request.body);
        const auction = await auctionLogic.getOneAuctionAsync(bid.auctionId);
        const offer = +bid.offer;
        const maxOffer = auction.maxOffer;
        const minOffer = auction.minOffer;

        //check if offer valid to max and min offer
        if(offer > maxOffer | offer < minOffer) {
            return response.status(400).send({error: 'Offer not valid!'});
        }
        
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
router.put('/:_id', verifyLogin, async (request, response) => {
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
router.patch('/:_id', verifyLogin, async (request, response) => {
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

router.delete('/:id', verifyLogin, async(request,response) => {
    try{
        const _id = request.params._id;
        await bidsLogic.deleteBidAsync(_id);
        response.sendStatus(204);
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});

router.get('/join/bids-in-auction/:auctionId', async (request, response) => {  
    try{
        const auctionId = request.params.auctionId;
        const bids = await bidsLogic.getAllBidsIncludingSpecificAuctionAsync(auctionId);
        if(!bids){
            response.sendStatus(404);
            return;
        }
        for(let bid of bids){
            if(bid.userId){
                bid.userId.password = '';
                bid.userId.email = '';
            }
        }
        response.json(bids);
    }
    catch(err){
        response.status(500).send( { error: err });
    }

});

router.get('/join/top10/:auctionId', async (request, response) => {
    try{    
        const auctionId = request.params.auctionId;
        const bidsArr = await bidsLogic.getAllBidsIncludingSpecificAuctionAsync(auctionId);
        if(!bidsArr){
            return;
        }
        const infoArr = [];
        const filteredObj = {};
        const users = [];
        

        
        for(let item of bidsArr) {
            if(!filteredObj[item.offer]){
                filteredObj[item.offer] = [];
            }
            users.push(item.userId);
            filteredObj[item.offer].push(item);
        }
        for(const prop in filteredObj) {
            if(filteredObj[prop].length === 1) {
                const obj = {
                    "offer" : filteredObj[prop][0].offer,
                    "userId" : filteredObj[prop][0].userId
                }
                infoArr.push(obj);
            }
        }
        infoArr.sort((a, b)=> { 
            return a.offer - b.offer
        });
        const outBidedArr = infoArr.slice(10);
        const uniqueArr = infoArr.slice(0, 10);

        //--------------------------------
        // console.log(infoArr);
        // console.log("--------------");
        // console.log(uniqueArr);
        // console.log("--------------");
        // console.log(outBidedArr);
        const filteredUsers = await userLogic.getManyUsers(users);

        //send sms to uniqueArr
        for(const item of uniqueArr){
            
            const user = await filteredUsers.find(user => `${user._id}` === `${item.userId}`);
            console.log(user.phone);
            
            
            // let todo = {
        //     "body": "blabla",
        //     "to": "+972545658994"
        // }

        // fetch('http://localhost:3000/api/sms/sendSMS', {
        //     method: "POST", 
        //     body : JSON.stringify(todo), 
        //     headers: {'Content-Type': 'application/json'},
        // });
            
            
        }
        console.log("=========================");
        //send sms to outBidedArr
        for(const item of outBidedArr){
            
            const user = await filteredUsers.find(user => `${user._id}` === `${item.userId}`);
            console.log(user.phone);
            
            
            // let todo = {
        //     "body": "blabla",
        //     "to": "+972545658994"
        // }

        // fetch('http://localhost:3000/api/sms/sendSMS', {
        //     method: "POST", 
        //     body : JSON.stringify(todo), 
        //     headers: {'Content-Type': 'application/json'},
        // });
            
            
        }
        
        response.status(200).json();
        return;

    }catch(err){
        response.status(500).json({ error: err.message });
    }
});

module.exports = router;