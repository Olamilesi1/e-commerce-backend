import Joi from 'joi'

export const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(), 
  // image: Joi.string(),
  status: Joi.string().required(), 
  title: Joi.string().required(), 
});

