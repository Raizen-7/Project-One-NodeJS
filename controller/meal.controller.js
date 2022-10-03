//MODELS
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// UTILS
const { catchAsync } = require('../utils/catchAsync.util');

const createMeal = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const { name, price } = req.body;

  const newMeal = await Meal.create({
    restaurantId: restaurant.id,
    name,
    price,
  });

  res.status(201).json({ status: 'success', newMeal });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: { status: 'active' },
    include: [{ model: Restaurant }],
  });

  res.status(200).json({ meals });
});

const getMealById = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await Meals.findOne({
    where: { status: 'active', id: mealId },
    include: [{ model: Restaurant }],
  });

  res.status(200).json({ meal });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  const { name, price } = req.body;

  await meal.update({ name, price });

  res.status(200).json({ status: 'success' });
});

const deletedMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'deleted' });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deletedMeal,
};