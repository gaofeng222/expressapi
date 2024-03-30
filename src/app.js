const express = require("express");
const userRouter = require("./router/user");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", userRouter);

app.listen(3333, () => {
  console.log("app is running on port 3333");
});
