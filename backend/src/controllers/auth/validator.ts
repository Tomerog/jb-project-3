import Joi from "joi";

export const loginValidator = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(4).max(64).required(),
});

export const signupValidator = loginValidator.append({
  firstName: Joi.string().max(40).required(),
  lastName: Joi.string().max(40).required(),
});
