const express = require("express");
const EmailLogic = require("../business-logic/email-logic");
const authLogic = require("./../business-logic/auth-logic");
const User = require("../models/user");

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const info = request.body;
    if (info.email && info.subject && info.text) {
      const email = new EmailLogic.EmailUtil();
      email.send(
        info.from? info.from : '"LPA Group" <LPA@LPA.com>',
        info.email,
        info.subject,
        info.text,
        function (err, result) {
          if (err) {
            next(err);
          }
          response.json({ ...result, msg: "Email Sent" });
        }
      );
    } else {
      response.json({ ...info, msg: "something is missing" });
    }
    // create reusable transporter object using the default SMTP transport
  } catch (err) {
    response.status(500).send({ error: err });
  }
});

router.get("/temp", async (req, res) => {
  const temp = new EmailLogic.emailTemplates();
  const result = await temp.setTemplate("whats up", "this is a test");
  res.send(result);
});
router.post("/sendReset", async (req, res, next) => {
  if (req.body.email) {
    console.log(req.body);
    const gToken = authLogic.SetUserToken(req.body.email, (err, tokenres) => {
      if (err) {
        return next(err);
      }
      console.log(gToken, tokenres);
      const email = new EmailLogic.EmailUtil();
      const url = `~/resetPassview/${gToken}`;
      // const text = `<div>please let us make the diffreance<a href="${url}">link Email Confirmation</a></div>`;
      const text = 'http://www.facebook.com';
      email.send(
        '"LPA Group" <LPA@LPA.com>',
        req.body.email,
        "Lap Email Confirmation",
        text,
        (err, result) => {
          if (err) {
            next(err);
          }
          res.json({  msg: "Email Sent" });
        }
      );
    });
  } else {
    res.json({ msg: "no Emait was typed" });
  }
});
module.exports = router;
