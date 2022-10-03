// MODELS
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

// UTILS
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const restaurantExists = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { status: 'active', id: restaurantId },
    include: { model: Review },
  });

  if (!restaurant) {
    return next(new AppError('Restaurant does not exist with this Id', 404));
  }

  req.restaurant = restaurant;

  next();
});

module.exports = { restaurantExists };