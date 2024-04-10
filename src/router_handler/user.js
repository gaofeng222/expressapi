const db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/index");
console.log("🚀 ~ jwt:", jwt);
/**
 * 检测表单数据是否合法
 * 检测用户名否存在
 * 对密码进行加密处理
 *
 */

const register = (req, res) => {
  const userInfo = req.body;
  const { username, password } = userInfo;
  if (!username || !password) {
    return res.fnCb("用户名或密码不合法");
  }
  const sqlSearch = "select * from tb_users where username = ?";
  const sqlAdd = "insert into tb_users set ?";
  db.query(sqlSearch, [username], (err, data) => {
    if (err) {
      return res.fnCb(err);
    }

    if (data.length > 0) {
      return res.fnCb("用户名已存在，请更换用户名!");
    }

    userInfo.password = bcrypt.hashSync(password, 10);
    console.log("🚀 ~ db.query ~ userInfo:", userInfo);

    db.query(sqlAdd, userInfo, (err, data) => {
      if (err) {
        return res.fnCb(err);
      }
      console.log("🚀 ~ db.query ~ data:", data);

      if (data.affectedRows != 1) {
        return res.fnCb("注册用户失败，请稍后再试");
      }
      return res.fnCb("恭喜,用户注册成功！！", 0);
    });
  });
};

/**
 * 检查表单数据是否合法
 * 根据用户名查询数据
 * 判断用户密码是否正确
 * 生成jwt的token
 */
const login = (req, res) => {
  const userInfo = req.body;
  const { username, password } = userInfo;
  const sql = "select * from tb_users where username = ?";

  db.query(sql, username, (err, data) => {
    if (err) return res.fnCb(err);
    if (data.length !== 1) return res.fnCb("登录失败");
    //判断用户输入的密码是否一致
    const isPwd = bcrypt.compareSync(password, data[0].password);
    if (!isPwd) return res.fnCb("密码有误！登录失败");
    //在服务端生成token
    const userInfo = { ...data[0], password: "", usr_pic: "" };
    console.log("🚀 ~ db.query ~ userInfo:", userInfo);
    const token = jwt.sign(userInfo, jwtConfig.jwtSecret, { expiresIn: "1h" });
    res.send({
      status: 0,
      message: "登录成功",
      token: "Bearer " + token,
    });
  });
};

module.exports = {
  register,
  login,
};
