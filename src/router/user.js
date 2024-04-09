const express = require("express");
const router = express.Router();
const db = require("../db/index");

//查询数据
// const sqlStr = "select * from tb_users";
// db.query(sqlStr, (err, data) => {
//   if (err) return console.log(err.message);
//   console.log("🚀 ~ db.query ~ data:", data);
// });

//插入数据1
// const user = { username: "spider-man", password: "456789" };
// const sqlStr2 = "insert into tb_users (username,password) values (?,?)";
// db.query(sqlStr2, [user.username, user.password], (err, data) => {
//   if (err) return console.log(err.message);
//   if (data.affectedRows === 1) {
//     console.log("插入成功");
//   }
// });

//插入数据2  快速插入
// const user = { username: "hot-man", password: "987123" };
// const sqlStr2 = "insert into tb_users set ?";
// db.query(sqlStr2, user, (err, data) => {
//   if (err) return console.log(err.message);
//   if (data.affectedRows === 1) {
//     console.log("插入成功");
//   }
// });

//更新数据1

// const user = { id: 7, username: "aaa", password: "654321" };
// const sqlStr3 = "update tb_users set username = ? ,password = ? where id = ?";
// db.query(sqlStr3, [user.username, user.password, user.id], (err, data) => {
//   if (err) return console.log(err.message);
//   //执行update语句也是返回一个对象
//   if (data.affectedRows === 1) {
//     console.log("修改成功");
//   }
// });

//更新数据2--快捷方式
// const user = { id: 7, username: "sam1", password: "123456" };
// const sqlStr3 = "update tb_users set ? where id = ?";
// db.query(sqlStr3, [user, user.id], (err, data) => {
//   if (err) return console.log(err.message);
//   //执行update语句也是返回一个对象
//   if (data.affectedRows === 1) {
//     console.log("修改成功");
//   }
// });

//删除数据，会真正删除数据,硬删除
// const sqlStr4 = "delete from tb_users where id = ?";
// db.query(sqlStr4, 7, (err, data) => {
//   if (err) return console.log(err.message);
//   if (data.affectedRows === 1) {
//     console.log("删除成功");
//   }
// });
//标记删除，只是模拟删除，数据还在数据库,软删除
const sqlStr5 = "update tb_users set status = ? where id = ?";
db.query(sqlStr5, [1, 9], (err, data) => {
  if (err) return console.log(err.message);
  if (data.affectedRows === 1) {
    console.log("删除成功");
  }
});

module.exports = router;
