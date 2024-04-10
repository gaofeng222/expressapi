const express = require("express");
const router = express.Router();
const schema = require("../schema/user");
const userInfoHandler = require("../router_handler/userInfo");
// 1. 导入 @escook/express-joi
const expressJoi = require("@escook/express-joi");

router.get("/userInfo", userInfoHandler.userInfo);
router.post(
  "/userInfo",
  expressJoi(schema.updateUserInfoSchema),
  userInfoHandler.updateUserInfo
);

module.exports = router;
