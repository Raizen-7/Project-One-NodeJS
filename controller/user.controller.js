const jwr = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

//Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

dotenv.config({ path: './config.env' });

const getAllOrders = catchAsync(async (req, res, next) => {

	const { sessionUser } = req;

    const orders = await Order.findAll({
		where: { userId: sessionUser.id , status: 'active' },
		include: [
			{
				model: Meal
			},
			{
				model: Restaurant
			},
			{
				model: Review
			},
		],
	});

	res.status(200).json({
		status: 'success',
		data: { orders },
	});
});

const getOrderById = catchAsync(async (req, res, next) => {
	const { sessionUser } = req;
  
	const userOrder = await Order.findOne({
	  where: { userId: sessionUser.id, status: 'active' },
	  include: [
		{ 
			model: Meal
		},
		{ 
			model: Restaurant
		},
		{
			model: Review
		},
	],
	});
  
	if (!userOrder) {
	  return next(new AppError(`this order id it doesn't exist`, 404));
	}
  
	res.status(200).json({ status: 'success', userOrder });
  });

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

	// Encrypt the password
	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	// Remove password from response
	newUser.password = undefined;

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newUser },
	});
});

const updateUser = catchAsync(async (req, res, next) => {
    const { name, email } = req.body;
	const { user } = req;

	// Update using a model's instance
	await user.update({ name, email });

	res.status(200).json({
		status: 'success',
		data: { user },
	});
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;
	// Soft delete
	await user.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

	// Validate if the user exist with given email
	const user = await User.findOne({
		where: { email, status: 'active' },
	});

	// Compare passwords (entered password vs db password)
	// If user doesn't exists or passwords doesn't match, send error
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Wrong credentials', 400));
	}

	// Remove password from response
	user.password = undefined;

	// Generate JWT (payload, secretOrPrivateKey, options)
	const token = jwr.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30m',
	});

	res.status(200).json({
		status: 'success',
		data: { user, token },
	});
 });

module.exports={
    getAllOrders,
	getOrderById,
    createUser,
    updateUser,
    deleteUser,
    login,
};
