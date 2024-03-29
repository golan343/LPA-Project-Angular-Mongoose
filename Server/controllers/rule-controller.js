const express = require('express');
const ruleLogic = require('../business-logic/rule-logic');
const Rule = require('../models/rule');

const router = express.Router();


router.get('/', async (request, response) => {
    try{
        const rules = await ruleLogic.getAllRulesAsync();
        response.json(rules);


    }
    catch(err) {
        response.status(500).send( { error: err });
    }
});

router.get('/:_id', async (request, response) => {
    try{
        const _id = request.params._id;
        const rule = await ruleLogic.getRuleAsync(_id);
        if(rule.createdBy.password){
            rule.createdBy.password = '';
        }
        if(!rule) {
            response.sendStatus(404);
            return;
        }
        response.json(rule);

    }
    catch(err) {
        response.status(500).send( { error: err });
    }
});

router.post('/', async (request, response) => {
    try{
        const rule = new Rule(request.body);
        const error = await rule.validate();
        if(error) {
            response.status(400).send(error.message);
            return;
        }

        const addedRule = await ruleLogic.addRuleAsync(rule);
        response.status(201).json(addedRule);

    }
    catch(err) {
        response.status(500).send( { error: err });
    }
});

router.put('/:_id', async (request, response) => {
    try{
        const rule = new Rule(request.body);
        rule._id = request.params._id;

        const error = await rule.validate();
        if(error) {
            response.status(400);
            return;
        }
        const updateRule = await ruleLogic.updateRuleAsync(rule);
        if(!updateRule) {
            response.status(404);
            return;
        }
        response.json(updateRule);
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});

router.patch('/:_id', async (request, response) => {
    try{
        const rule = new Rule(request.body);
        rule._id = request.params._id;

        //validate
        const error = await rule.validate();
        if(error) {
            response.status(400).send(error.message);
            return;
        }

        const updateRule = await ruleLogic.updateRuleAsync(rule);
        if(!updateRule) {
            response.sendStatus(404);
            return;
        }
        response.json(updateRule);
    }
    catch(err){
        response.status(500).send( { error: err });
    }
});

router.delete('/:_id', async (request, response) => {
    try{
        const _id = request.params._id;
        await ruleLogic.deleteRuleAsync(_id);
        response.sendStatus(204);
    }
    catch(err) {
        response.status(500).send( { error: err });
    }
});

module.exports = router;