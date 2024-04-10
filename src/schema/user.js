const Joi = require("joi");

const userSchema = {
  // 2.1 校验 req.body 中的数据
  body: {
    username: Joi.string().alphanum().min(3).max(12).required(),
    password: Joi.string()
      .pattern(/^[\S]{6,15}$/)
      .required(),
    repassword: Joi.ref("password"),
  },
};

const updateUserInfoSchema = {
  body: {
    id: Joi.number().integer().min(1).required(),
    nickname: Joi.string().required(),
    email: Joi.string().email().required(),
  },
};

module.exports = {
  userSchema,
  updateUserInfoSchema,
};
