const express = require("express");
const router = express.Router();
const articleHandler = require("../router_handler/article");
const schema = require("../schema/arcicle");
const expressJoi = require("@escook/express-joi");

router.get("/cates", articleHandler.getArticleCates);
router.post(
  "/addCates",
  expressJoi(schema.articleSchema),
  articleHandler.addArticleCates
);
router.get(
  "/deleteCate/:id",
  expressJoi(schema.deleteCateSchema),
  articleHandler.deleteCate
);

router.get(
  "/getArtCateById/:id",
  expressJoi(schema.getCateSchema),
  articleHandler.getArtCateById
);

module.exports = router;
