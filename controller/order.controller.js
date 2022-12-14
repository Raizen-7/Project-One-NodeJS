//MODELS
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// UTILS
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const { quantity, mealId } = req.body;

  const searchMeal = await Meal.findOne({
    where: { status: 'active', id: mealId },
  });

  if (!searchMeal) {
    return next(new AppError('Meal does not exist with given Id', 404));
  }

  const totalPrice = searchMeal.price * quantity;

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice,
    quantity,
  });

  res.status(201).json({ status: 'success', newOrder });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const userOrders = await Order.findAll({
    where: { userId: sessionUser.id },
    include: [{ model: Meal }, { model: Restaurant }],
  });

  res.status(200).json({ status: 'success', userOrders });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(200).json({ status: 'success' });
});

const deletedOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
  deletedOrder,
};