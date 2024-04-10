const express = require("express");
const router = express.Router();
const userInfoHandler = require("../router_handler/userInfo");

router.get("/userInfo", userInfoHandler.userInfo);

module.exports = router;
