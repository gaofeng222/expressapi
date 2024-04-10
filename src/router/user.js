const express = require("express");
const multer = require("multer");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");

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
  console.log("🚀 ~ router.get ~ req.auth:", req.auth);
  const { username } = req.auth;
  res.send({
    status: 0,
    msg: "ok",
    data: username,
  });
});

router.post("/logout", (req, res) => {
  res.send({
    status: 0,
    msg: "退出成功!!!",
  });
});
let img = "";
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/")); // 确保这个文件夹已经存在
  },
  filename(req, file, cb) {
    console.log("🚀 ~ filename ~ file:", file);
    img =
      file.fieldname + "_" + Date.now() + "." + file.originalname.split(".")[1];
    cb(null, img);
  },
});

const upload = multer({ storage });
router.post("/upload", upload.single("myFile"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({
      status: 1,
      message: "no file uploaded.",
    });
  }
  res.send({
    status: 0,
    msg: "上传成功!!!",
    data: img,
  });
});
let imgArrs = [];
router.post(
  "/uploads",
  upload.array("filelist", 2),
  function (req, res, next) {
    const files = req.files;
    if (!files.length) {
      return res.status(400).send({
        status: 1,
        message: "no file uploaded.",
      });
    }
    files.forEach((file) => {
      imgArrs.push(file.filename);
    });
    res.send({
      status: 0,
      msg: "上传成功!!!",
      data: imgArrs,
    });
  },
  function (err, req, res, next) {}
);

module.exports = router;
