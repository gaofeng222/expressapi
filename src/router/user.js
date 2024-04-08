const express = require("express");
const router = express.Router();
// const fs = require("fs");
// const path = require("path");

router.get("/info", (req, res) => {
  console.log("🚀 ~ router.get ~ req:", req.query);
  res.send({
    name: "zs111",
    gender: "男",
  });
});

router.get("/info/:id/:name", (req, res) => {
  console.log("🚀 ~ router.get ~ req:", req.params);
  res.send(req.params);
});

router.get("/info/home", (req, res) => {
  // const data = fs.readFileSync(path.join(__dirname, "../views/index.html"));
  // res.end(data);
  res.render("index", { foo: "Foo", hobby: ["乒乓球", "羽毛球", "篮球"] });
});

router.get("/user/list", (req, res) => {
  res.send("get user list");
});

const mw = (req, res, next) => {
  console.log("🚀 ~ mw ~ req:指定路由的中间件", res.a, res.b);
  next();
};
const mw2 = (req, res, next) => {
  console.log("🚀 ~ mw ~ req:指定路由的中间件2222");
  next();
};

router.post("/user/add", [mw, mw2], (req, res) => {
  console.log("🚀 ~ router.get ~ req:", req.body);
  res.send(req.body);
});

router.post("/user/book", (req, res) => {
  console.log("🚀 ~ router.post ~ req:", req.body);
  res.send(req.body);
});

module.exports = router;
