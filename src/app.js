const express = require("express");
const userRouter = require("./router/user");
const bookRouter = require("./router/book");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const { expressjwt } = require("express-jwt");
const jwtConfig = require("./config/index");

app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "uploads")));
//ejs模版的必须配置
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
//解析请求体参数
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
//jwt中间件
//安装的express-jwt模块会默认为最新版本，更新后的jwt需要在配置中加入algorithms属性，即设置jwt的算法。一般HS256为配置algorithms的默认值。
app.use(
  expressjwt({ secret: jwtConfig.jwtSecret, algorithms: ["HS256"] }).unless({
    path: [/^\/(api|images)\/| /],
  })
);

//跨域资源共享
app.use(cors());
app.use("/api", userRouter);
app.use("/book", bookRouter);

//错误级别的中间件
app.use((err, req, res, next) => {
  console.log("🚀 ~ app.use ~ err:", err);
  //token解析失败
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效的token",
    });
  }
  res.send({
    status: 500,
    message: "服务端错误",
  });
});

app.listen(4444, () => {
  console.log("app is running on port 4444");
});
