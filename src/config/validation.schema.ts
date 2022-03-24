import * as Joi from 'joi';

export const validationSchema = Joi.object({
  ORIGIN: Joi.string().required(),
  HOST: Joi.string().default('http://localhost'),
  DB_HOST: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  NODE_ENV: Joi.string().default('develop').optional(),
  PORT: Joi.string().default('5000').regex(/^\d+$/).required(),
});
