const express = require("express");
const multer = require("multer");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
const jwtConfig = require("../config/index");
const schema = require("../schema/user");
const userHandler = require("../router_handler/user");
// 导入 Joi 来定义验证规则
const Joi = require("joi");
// 1. 导入 @escook/express-joi
const expressJoi = require("@escook/express-joi");

router.post("/register", expressJoi(schema.userSchema), userHandler.register);
router.post("/login", expressJoi(schema.userSchema), userHandler.login);

module.exports = router;
