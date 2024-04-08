const express = require("express");
const userRouter = require("./router/user");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const bd = require("./mw/bodyParse");
app.use(express.static("public"));
//ejs模版的必须配置
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//解析请求体参数
// app.use(express.json());
app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: false }));
//自定义的中间件
app.use(bd.bdParse);
app.use((req, res, next) => {
  console.log("中间件1");
  res.a = "aaaa";
  next(); //把流转关系，转交给下一个中间件或者路由
});
app.use((req, res, next) => {
  console.log("中间件2");
  res.b = "bbbb";
  next();
});

app.use("/api", userRouter);

//错误级别的中间件
app.use("/", (req, res) => {
  throw new Error("服务器内部发生了错误！！");
  res.send("Home page...");
});

app.use((err, req, res, next) => {
  res.send("Error! " + err.message);
});

app.listen(4444, () => {
  console.log("app is running on port 4444");
});
