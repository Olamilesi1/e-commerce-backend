import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().min(5).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(15).required(),
  });
  
  export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

export const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
  username: Joi.string().min(3),
});