/**
 * Schema validators for Post requests to `/api/<endpoints>`
 * @see api.controller.js
 * @file desfines schema validators
 * @requires Joi
 */

import { Joi } from 'express-validation';

export const registerTutor = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const registerStudents = {
  body: Joi.object({
    tutor: Joi.string().email().required(),
    students: Joi.array()
      .items(Joi.string().email())
      .required()
      .min(1),
  }),
};

export const retrieveNotifications = {
  body: Joi.object({
    tutor: Joi.string().email().required(),
    notification: Joi.string().required(),
  }),
};

export const suspendStudent = {
  body: Joi.object({
    student: Joi.string().email().required(),
  }),
};

export const getCommonStudents = {
  body: Joi.object({
    tutor: Joi.alternatives().try(
      Joi.array().items(Joi.string().email().required()),
      Joi.string().email().required()
    ),
  }),
};
