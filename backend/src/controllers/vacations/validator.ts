import Joi from "joi";

const today = new Date().toISOString().split("T")[0];

export const vacationIdValidator = Joi.object({
  id: Joi.string().uuid().required(),
});

export const addVacationValidator = Joi.object({
  destination: Joi.string().max(64).required(),
  description: Joi.string().required(),
  vacationStart: Joi.date().min(today).required().messages({
    "date.min": "Cannot select dates in the past",
    "any.required": "Start date is required",
  }),
  vacationEnd: Joi.date().min(Joi.ref("vacationStart")).required().messages({
    "date.min": "End date must be after start date",
    "any.required": "End date is required",
  }),
  price: Joi.number().min(0).max(10000).required(),
});

export const UpdateVacationValidator = Joi.object({
  destination: Joi.string().max(64).required(),
  description: Joi.string().required(),
  vacationStart: Joi.date().required(),
  vacationEnd: Joi.date().min(Joi.ref("vacationStart")).required().messages({
    "date.min": "End date must be after start date",
  }),
  price: Joi.number().min(0).max(10000).required(),
  imageUrl: Joi.optional(),
});

export const newVacationFilesValidator = Joi.object({
  vacationImage: Joi.object({
    mimetype: Joi.string().valid(
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp"
    ),
  })
    .unknown(true)
    .required(),
});

export const updateVacationFilesValidator = Joi.object({
  vacationImage: Joi.object({
    mimetype: Joi.string().valid(
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp"
    ),
  })
    .unknown(true)
    .optional(),
});
