const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const createUserValidators = [
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 3 })
		.withMessage('Name must be at least 3 characters'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isString()
		.withMessage('Password must be a string')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters'),
	checkValidations,
];

const createRestaurantValidations = [
	body('name')
		.notEmpty()
		.withMessage('Name Restaurant cannot be empty'),
	body('address')
		.notEmpty()
		.withMessage('Address Restaurant cannot be empty'),
	body('rating')
	  .notEmpty()
	  .withMessage('Rating Restaurant cannot be empty')
	  .isInt({ min: 1, max: 5 })
	  .withMessage('rating value must be between 1 to 5'),
	  checkValidations,
  ];

  const createReviewValidations = [
	body('comment')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ max: 100 })
		.withMessage('comments must be maximum 100 characters'),
	body('rating')
		.notEmpty()
		.withMessage('Rating cannot be empty')
		.isInt({ min: 1, max: 5 })
		.withMessage('rating value must be between 1 to 5'),
		checkValidations,
  ];
  
  const createMealValidations = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('price')
	  .notEmpty()
	  .withMessage('Name cannot be empty')
	  .isCurrency()
	  .withMessage('Invalide value'),
  ];

  const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
		const errorMessages = errors.array().map(err => err.msg);

		const message = errorMessages.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

module.exports = { 
	createUserValidators,
	createRestaurantValidations,
	createReviewValidations,
	createMealValidations,
	checkValidations
};