const Joi = require("joi");

const name = Joi.string().required();
const alias = Joi.string().alphanum().required();
const id = Joi.number().integer().min(1).required();
const articleSchema = {
  body: { name, alias },
};

const deleteCateSchema = {
  params: {
    id,
  },
};
const getCateSchema = {
  params: {
    id,
  },
};

const updateCateSchema = {
  body: {
    id,
    name,
    alias,
  },
};

module.exports = {
  articleSchema,
  deleteCateSchema,
  getCateSchema,
  updateCateSchema,
};
