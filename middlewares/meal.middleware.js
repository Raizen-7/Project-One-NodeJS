// MODELS
const { Meal } = require('../models/meal.model');

// UTILS
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const mealExists = catchAsync(async (req, res, next) => {
  const { mealId } = req.params;

  const meal = await Meal.findOne({
    where: { status: 'active', id: mealId },
  });

  if (!meal) {
    return next(new AppError('Meals does not exist with given Id', 404));
  }

  req.meal = meal;

  next();
});

module.exports = { mealExists };