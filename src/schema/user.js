const Joi = require("joi");

const password = Joi.string()
  .pattern(/^[\S]{6,15}$/)
  .required();

const userSchema = {
  // 2.1 校验 req.body 中的数据
  body: {
    username: Joi.string().alphanum().min(3).max(12).required(),
    password,
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

const updatePwdSchema = {
  body: {
    oldPassword: password,
    newPassword: Joi.not(Joi.ref("oldPassword")).concat(password),
  },
};

const avatarSchema = {
  body: {
    avatar: Joi.string().dataUri().required(),
  },
};

module.exports = {
  userSchema,
  updateUserInfoSchema,
  updatePwdSchema,
  avatarSchema,
};
