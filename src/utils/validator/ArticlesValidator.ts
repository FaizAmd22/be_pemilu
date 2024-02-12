import * as Joi from "joi";

export const createArticlesSchema = Joi.object({
  title: Joi.string().max(250).required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  user: Joi.number().required(),
  createdAt: Joi.date(),
  updateAt: Joi.date(),
});

export const updateArticlesSchema = Joi.object({
  title: Joi.string().max(250),
  description: Joi.string(),
  image: Joi.string(),
  createdAt: Joi.date(),
  updateAt: Joi.date(),
});

;
