const express = require("express");
const router = express.Router();
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username != "admin" && password != "123456") {
    return res.send({
      status: 1,
      msg: "登录失败",
    });
  }
  req.session.user = req.body; //用户信息
  req.session.islogin = true; //用户密码
  res.send({
    status: 0,
    msg: "登录成功",
  });
});

router.get("/userInfo", (req, res) => {
  const { islogin } = req.session;
  if (!islogin) {
    return res.send({
      status: 1,
      msg: "获取失败，请先登录",
    });
  }
  res.send({
    status: 0,
    msg: "ok",
    data: req.session.user,
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.send({
    status: 0,
    msg: "退出成功!!!",
  });
});

module.exports = router;
