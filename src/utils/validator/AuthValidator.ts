import * as Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().max(250).required(),
  address: Joi.string().max(250).required(),
  gender: Joi.string().required(),
  username: Joi.string().min(4).max(250).required(),
  password: Joi.string().min(8).max(20).required(),
  createdAt: Joi.date(),
  updateAt: Joi.date(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().max(250),
  address: Joi.string().max(250),
  gender: Joi.string(),
  updateAt: Joi.date(),
});

export const createAdminSchema = Joi.object({
  name: Joi.string().max(250).required(),
  gender: Joi.string().required(),
  username: Joi.string().min(4).max(250).required(),
  address: Joi.string().max(250).required(),
  password: Joi.string().min(8).max(20).required(),
  createdAt: Joi.date(),
  updateAt: Joi.date(),
})

export const loginSchema = Joi.object({
  username: Joi.string().min(4).max(250).required(),
  password: Joi.string().min(8).max(20).required(),
});
