import Joi from "joi";

export const followsIdValidator = Joi.object({
  vacationId: Joi.string().uuid().required(),
});
