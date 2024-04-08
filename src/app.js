const express = require("express");
const userRouter = require("./router/user");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
//ejs模版的必须配置
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
//解析请求体参数
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//jsonp接口,必须在cors配置之前

app.use("/api/jsonp", (req, res) => {
  // TODO
  const fnName = req.query.callback;
  const data = {
    name: "李世明",
    age: 150,
    gender: "男",
  };
  const sData = `${fnName}(${JSON.stringify(data)})`;
  res.send(sData);
});

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
