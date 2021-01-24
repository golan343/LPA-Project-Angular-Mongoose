const express = require("express");
const jwt = require("jsonwebtoken");
const authLogic = require("../business-logic/auth-logic");
const errorHandler = require("../helpers/error-handler");
const hash = require("../helpers/hash");
const User = require("../models/user");

const router = express.Router();
router.get('/userImage/:id',(req,res,next)=>{
  const id = req.params.id;
  authLogic.getUserImage(id, function(err, result){
    if(err){
      return next(err);
    }
    res.json(result);
  })
})
router.post("/setUserImage",(req,res,next)=>{
  
//  if(req.body.img && req.body.id){
    authLogic.saveUserImage(req.body.id, req.body.img, (err,result)=>{
      if(err){
        return next(err);
      }
      res.json({...result,msg:'image has been saved successfuly!'});
    });
  // }
  // res.status(401).json({msg:'no params sent'});
});
router.post("/register", async (request, response) => {
  try {
    const user = new User(request.body);
    console.log(user);
    const error = await user.validate();
    if (error) {
      console.log(error);
      response.status(400).json(error);
      return;
    }

    const addedUser = await authLogic.registerAsync(user);

    const token = jwt.sign({ user }, config.jwt.secretKey, {
      expiresIn: "30m",
    });
    request.session.user = addedUser;
    addedUser.password = undefined;
    response.status(201).json({ addedUser, token });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});
router.post("/reset", async (req, res, next) => {
  const params = req.body;
  console.log(params);
  if (params.id && params.old && params.password) {
      authLogic.findUserById(params.id, function (err, doc) {
          if (err) {
              next(err);
          }
          const foundUser = doc[0];
      if (foundUser.password === hash(params.old)) {
          authLogic.resetPass(foundUser._id, params.password, function (result) {
              res.json({ msg:'password was changed successfully'});
          });
      } else {
        res.json({msg:"old password do not match"});
      }
      
    });
  } else {
    res.status(500).send(params);
  }
});

router.get("/usersList", function (req, res) {
  authLogic.getAllUsers(function (err, users) {
    if (err) {
      res.status(501).json(err);
    }
    const usersMap = {};
    if (users) {
      users.forEach((element) => {
        usersMap[element._id] = element;
      });
      res.send(usersMap);
    }
  });
});

router.post("/login", async (request, response) => {
  try {
    const user = await authLogic.loginAsync(request.body);
    if (!user) {
      response.status(401).send("Incorrect email or password");
      return;
    }

    const token = jwt.sign({ user }, config.jwt.secretKey, {
      expiresIn: "30m",
    });
    user.password = undefined;
    request.session.user = user;
    console.log("success login");
    response.json({ user, token });
  } catch (err) {
    response.status(500).send({ error: err });
  }
});

router.post("/logout", (request, response) => {
  try {
    request.session.destroy();
    response.end();
    console.log("success logout");
  } catch (err) {
    response.status(500).send({ error: err });
  }
});

router.patch("/:_id", async (request, response) => {
  try {
    const user = new User(request.body);
    user._id = request.params._id;

    const updateUser = await authLogic.updateAsync(user);
    if (!updateUser) {
      response.sendStatus(404);
      return;
    }
    response.json(updateUser);
  } catch (err) {
    response.status(500).send({ error: err });
  }
});

router.patch("/updateUser/:id", (req, res) => {
  try {
    const user = new User(req.body);
    const error = user.validateSync();
    if (error) {
      res.status(400).send({ error: error });
      return;
    }
    console.log(user);
    authLogic.adminUpdateUser(user, function (err, userModel) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.status(200).send(userModel);
    });
  } catch (err) {
    response.status(500).send({ error: err });
  }
});

router.delete("/deleteUser/:id", async (request, response) => {
  const id = request.params.id;
  const result = await authLogic.deleteUser(id);
  response.send(result);
});

module.exports = router;
