const db = require("../db/index");

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
    res.send({
      status: 0,
      message: "修改用户信息成功!",
    });
  });
};

module.exports = {
  userInfo,
  updateUserInfo,
};
