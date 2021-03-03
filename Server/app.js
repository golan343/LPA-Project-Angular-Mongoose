// global.config = require(process.env.NODE_ENV ? "./config-prod" : "./config-dev");
if (process.env.PORT) {
    global.config = require("./config-prod");
}
else {
    global.config = require("./config-dev");
}

const express = require('express');
const server = express();
const cors = require('cors');
const path = require('path');
const authController = require('./controllers/auth-controller');
const auctionController = require('./controllers/auction-controller');
const bidsController = require('./controllers/bids-controller');
const ruleController = require('./controllers/rule-controller');
const smsController = require('./controllers/sms-controller');
const emailController = require('./controllers/email-controller');
const mailchimpController = require('./controllers/mailchimp-controller');
const kushkiController = require('./controllers/kushki-controller');
const uploadImageController = require('./controllers/uploads-image-controller');
const infoController = require('./controllers/info-controller');
const pageController = require('./controllers/pages-controller');
const roleController = require('./controllers/roles-controller');
require("./data-access-layer/dal");
const sanitize = require('./middleware/sanitize');
const expressRateLimit = require('express-rate-limit');
const expressSession = require('express-session');
const fileUpload = require('express-fileupload');
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  
  //  apply to all requests
server.use(limiter);
server.use(expressSession({
    name: "CaptchaSession",
    secret: "GishValidate",
    resave: true,
    saveUninitialized: false
}))

server.use("/api/", expressRateLimit({
    windowMs: 1000,
    max: 10,
    message: "Are you hacker?"
}));

server.use('/uploads', express.static('uploads'));
server.use(cors());
server.use(express.json());
server.use(sanitize);
server.use(fileUpload());

server.use(express.static(path.join(__dirname, "./_front-end")));
server.use("/api/", uploadImageController);
server.use("/api/auth", authController);
server.use("/api/auctions", auctionController);
server.use("/api/bids", bidsController);
server.use("/api/rule", ruleController);
server.use("/api/sms", smsController);
server.use("/api/info", infoController);
server.use("/api/email", emailController);
server.use("/api/mail", mailchimpController);
server.use("/api/kushki", kushkiController);
server.use("/api/page", pageController);
server.use("/api/role", roleController);



server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./_front-end/index.html"))
})

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port: ${port}`));