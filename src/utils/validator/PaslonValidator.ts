import * as Joi from "joi";

export const createPaslonSchema = Joi.object({
  name: Joi.string().max(250).required(),
  visionMission: Joi.string().required(),
  image: Joi.string().required(),
  createdAt: Joi.date(),
  updateAt: Joi.date(),
});

export const updatePaslonSchema = Joi.object({
  name: Joi.string().max(250),
  visionMission: Joi.string(),
  image: Joi.string(),
  createdAt: Joi.date(),
  updateAt: Joi.date(),
});