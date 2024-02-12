import * as Joi from "joi";

const createVoteSchema = Joi.object({
  user: Joi.number().positive().required(),
  paslon: Joi.number().positive().required(),
});

export default createVoteSchema;
