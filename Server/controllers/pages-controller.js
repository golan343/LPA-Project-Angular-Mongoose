const { ESRCH } = require("constants");
const express = require("express");
const pagesUtil = require("./../business-logic/pages-logic");
const pageLogic = require('./../business-logic/pages-logic');
const router = express.Router();

router.get("/",(req,res)=>{
    const pageOb = new pageLogic();
    pageOb.getAllPages((err,result)=>{
        console.log(err);
        res.json(result);
    })
});
router.get("/:name",(req,res)=>{
    const pageOb = new pageLogic();
    const name = req.params.name;
    pageOb.getPage(name,(err,result)=>{
        if(err){
            res.json(err);
            return;
        }
        res.json(result[0]||{});
    })
});
router.post('/', async (request, response) => {
    try{
        const pageContent = request.body;
        const page = new pagesUtil();
        const result = page.setPageContentObject(pageContent);
        response.json(result);
        
        
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});
module.exports = router;