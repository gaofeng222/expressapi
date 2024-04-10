const db = require("../db/index");
const bcrypt = require("bcryptjs");

const userInfo = (req, res) => {
  const sql =
    "select id,username,nickname,email,user_pic from tb_users where id = ?";
  db.query(sql, req.auth.id, (err, data) => {
    if (err) return res.fnCb(err);
    if (data.length !== 1) return res.fnCb("获取用户信息失败");
    res.send({
      status: 0,
      message: "获取用户信息成功!",
      data: data[0],
    });
  });
};

const updateUserInfo = (req, res) => {
  const sql = "update tb_users set ? where id = ?";
  const { id, nickname, email } = req.body;
  db.query(sql, [req.body, req.body.id], (err, data) => {
    if (err) return res.fnCb(err);
    if (data.affectedRows !== 1) return res.fnCb("修改用户信息失败");
    res.fnCb("修改用户信息成功!", 0);
  });
};

/**
 * 重置密码
 */

const updatePwd = (req, res) => {
  const sql = "select * from tb_users where id = ?";
  const sqlUpdatePwd = "update tb_users set password = ? where id = ?";
  db.query(sql, req.auth.id, (err, data) => {
    if (err) return res.fnCb(err);
    if (data.length !== 1) return res.fnCb("用户不存在");
    const { oldPassword, newPassword } = req.body;
    //bcrypt.compareSync(提交的数据，数据库中的数据)
    const isPwd = bcrypt.compareSync(oldPassword, data[0].password);
    if (!isPwd) return res.fnCb("原密码错误!");
    const pwd = bcrypt.hashSync(newPassword, 10);
    db.query(sqlUpdatePwd, [pwd, data[0].id], (err, data) => {
      if (err) return res.fnCb(err);
      if (data.affectedRows !== 1) return res.fnCb("修改密码失败");
      res.fnCb("修改成功", 0);
    });
  });
};

const updateAvatar = (req, res) => {
  // res.send("ok");
  const sql = "update tb_users set user_pic = ? where id = ?";
  db.query(sql, [req.body.avatar, req.auth.id], (err, data) => {
    if (err) return res.fnCb(err);
    if (data.affectedRows !== 1) return res.fnCb("修改头像失败");
    res.fnCb("修改头像成功", 0);
  });
};

module.exports = {
  userInfo,
  updateUserInfo,
  updatePwd,
  updateAvatar,
};
