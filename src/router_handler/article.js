const db = require("../db/index");

const getArticleCates = (req, res) => {
  const sql =
    "select * from tb_article_cate where is_delete = 0 order by id asc";
  db.query(sql, (err, data) => {
    if (err) return res.fnCb(err);
    if (data.length === 0) return res.fnCb("查询文章分类失败");
    res.send({
      status: 0,
      message: "获取文章分类成功!",
      data,
    });
  });
};

const addArticleCates = (req, res) => {
  const sql = "select * from tb_article_cate where name=? or alias=?";
  const sqlAdd = "insert into tb_article_cate set ?";
  //查重
  db.query(sql, [req.body.name, req.body.alias], (err, data) => {
    if (err) return res.fnCb(err);
    if (
      data.length === 2 ||
      (data.length === 1 &&
        data[0].name === req.body.name &&
        data[0].alias === req.body.alias)
    ) {
      return res.fnCb("分类名和别名被占用，请更换后重试!");
    }
    if (data.length === 1 && data[0].name === req.body.name) {
      return res.fnCb("分类名被占用，请更换后重试!");
    }
    if (data.length === 1 && data[0].alias === req.body.alias) {
      return res.fnCb("别名被占用，请更换后重试!");
    }
    //执行添加操作
    const cateRecord = { name: req.body.name, alias: req.body.alias };
    db.query(sqlAdd, cateRecord, (err, data) => {
      if (err) return res.fnCb(err);
      if (data.affectedRows != 1) {
        return res.fnCb("添加失败，请重新再试");
      }
      res.fnCb("添加成功", 0);
    });
  });
};

const deleteCate = (req, res) => {
  const sql = "update tb_article_cate set is_delete = 1 where id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.fnCb(err);
    if (data.affectedRows != 1) {
      return res.fnCb("删除文章分类失败，请重新再试");
    }
    res.fnCb("删除文章分类成功！", 0);
  });
};

const getArtCateById = (req, res) => {
  const sql = "select * from  tb_article_cate where id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.fnCb(err);
    if (data.length !== 1) {
      return res.fnCb("获取文章分类失败，请重新再试");
    }
    res.send({
      status: 0,
      message: "获取文章分类成功！",
      data,
    });
  });
};

//根据id更新文章分类
const updateArticleCate = (req, res) => {
  //查询不是当前id的数据，name和alias是不是存在，不能重复
  const sql =
    "select * from tb_article_cate where id <>? and (name=? or alias=?)";
  const sqlUpdate = "update tb_article_cate set ? where id = ?";
  const cateInfo = req.body;
  const { id, name, alias } = cateInfo;
  db.query(sql, [id, name, alias], (err, data) => {
    if (err) return res.fnCb(err);
    if (
      data.length === 2 ||
      (data.length === 1 &&
        data[0].name === req.body.name &&
        data[0].alias === req.body.alias)
    ) {
      return res.fnCb("分类名和别名被占用，请更换后重试!");
    }
    if (data.length === 1 && data[0].name === req.body.name) {
      return res.fnCb("分类名被占用，请更换后重试!");
    }
    if (data.length === 1 && data[0].alias === req.body.alias) {
      return res.fnCb("别名被占用，请更换后重试!");
    }
    db.query(sqlUpdate, [cateInfo, id], (err, data) => {
      if (err) return res.fnCb(err);
      if (data.affectedRows !== 1) {
        return res.fnCb("更新文章分类失败，请重新再试");
      }
      res.fnCb("更新文章分类成功！", 0);
    });
  });
};

module.exports = {
  getArticleCates,
  addArticleCates,
  deleteCate,
  getArtCateById,
  updateArticleCate,
};
