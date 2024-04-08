const express = require("express");
const router = express.Router();

router.get("/get", (req, res) => {
  const data = req.query;
  res.send({
    status: 0,
    msg: "ok",
    data,
  });
});

router.post("/post", (req, res) => {
  const data = req.body;
  res.send({
    status: 0,
    msg: "ok",
    data,
  });
});

router.delete("/delete", (req, res) => {
  res.send({
    status: 0,
    msg: "ok",
  });
});

module.exports = router;
