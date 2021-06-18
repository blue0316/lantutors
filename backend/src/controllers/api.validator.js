import { Joi } from 'express-validation';

export const register = {
  body: Joi.object({
    tutor: Joi.string().email().required(),
    students: Joi.array()
      .items(Joi.string().email())
      .required()
      .min(1),
  }),
};
