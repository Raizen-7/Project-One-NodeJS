// MODELS
const { Review } = require('../models/review.model');

// UTILS
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const reviewExists = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await Review.findOne({
    where: { status: 'active', id: reviewId },
  });

  if (!review) {
    return next(new AppError('Reviwe does not exist with given Id', 404));
  }

  req.review = review;

  next();
});

const protectOwnerReview = catchAsync(async (req, res, next) => {
  const { userSession } = req;
  const { restaurantId, reviewId } = req.params;

  const review = await Review.findOne({
    where: {
      id: reviewId,
      userId: userSession.id,
      restaurantId,
    },
  });

  if (!review) {
    return next(new AppError('Review does not exist with given Id', 404));
  }

  next();
});

module.exports = { reviewExists, protectOwnerReview };