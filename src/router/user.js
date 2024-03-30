const express = require("express");
const router = express.Router();

router.get("/info", (req, res) => {
  res.send("info ok");
});

router.post("/login", (req, res) => {
  console.log(req.body, "999");
  res.send("login");
});

module.exports = router;
