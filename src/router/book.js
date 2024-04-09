const express = require("express");
const router = express.Router();

router.get("/lists", (req, res) => {
  console.log(req.auth, "9999");
  res.send({
    status: 0,
    msg: "ok",
  });
});

module.exports = router;
