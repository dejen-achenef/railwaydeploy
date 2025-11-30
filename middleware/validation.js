import Joi from 'joi';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    next();
  };
};

// Validation schemas
export const schemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name must not exceed 100 characters'
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long'
    })
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required'
    })
  }),

  updateUser: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional().messages({
      'string.email': 'Please provide a valid email address'
    }),
    password: Joi.string().min(6).optional().messages({
      'string.min': 'Password must be at least 6 characters long'
    })
  }),

  createVideo: Joi.object({
    title: Joi.string().min(1).max(255).required().messages({
      'string.empty': 'Title is required',
      'string.max': 'Title must not exceed 255 characters'
    }),
    description: Joi.string().allow('', null).optional(),
    youtubeVideoId: Joi.string().required().messages({
      'string.empty': 'YouTube video ID is required'
    }),
    category: Joi.string().min(1).required().messages({
      'string.empty': 'Category is required'
    }),
    duration: Joi.number().integer().min(0).required().messages({
      'number.base': 'Duration must be a number',
      'number.integer': 'Duration must be an integer',
      'number.min': 'Duration must be 0 or greater',
      'any.required': 'Duration is required'
    })
  })
};