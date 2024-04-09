const express = require("express");
const userRouter = require("./router/user");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const session = require("express-session");

app.use(express.static("public"));
//ejs模版的必须配置
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
//解析请求体参数
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//配置session中间件
app.use(
  session({
    secret: "gaofeng", //任意字符串
    resave: false, //固定写法
    saveUninitialized: true, //固定写法
  })
);

//跨域资源共享
app.use(cors());
app.use("/api", userRouter);

//错误级别的中间件
app.use((err, req, res, next) => {
  res.send("Error! " + err.message);
});

app.listen(4444, () => {
  console.log("app is running on port 4444");
});
