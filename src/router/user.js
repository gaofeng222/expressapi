const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const jwtConfig = require("../config/index");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username != "admin" && password != "123456") {
    return res.send({
      status: 1,
      msg: "登录失败",
    });
  }
  //登录成功之后，生成jwt字符串,并通过token的形式返回给客户端
  //参数:用户的信息对象，加密的秘钥，配置的对象(当前token的有效期 30s | 2h)
  const token = jwt.sign({ username: username }, jwtConfig.jwtSecret, {
    expiresIn: "30s",
  });
  res.send({
    status: 0,
    msg: "登录成功",
    token,
  });
});

router.get("/userInfo", (req, res) => {
  res.send({
    status: 0,
    msg: "ok",
    data: req.session.user,
  });
});

router.post("/logout", (req, res) => {
  res.send({
    status: 0,
    msg: "退出成功!!!",
  });
});

module.exports = router;
