const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');

//Utils
const { AppError } = require('../utils/appError.util');


const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;
  
    const newRestaurant = await Restaurant.create({ name, address, rating });
  
    res.status(201).json({ status: 'success', newRestaurant });
  });

const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurant.findAll({
      where: { status: 'active' },
      include: [{ model: Review }],
    });
  
    res.status(201).json({ status: 'success', restaurants });
  });

const getRestaurantById = catchAsync(async (req, res, next) => {
    const { restaurantSerch } = req;
    
    const restaurant = await Restaurant.findOne({
        where: { restaurantId: restaurantSerch.id },
        include:[
            {
                model: Review
            },
            {
                model: User
            }
        ]
    });

    if (!restaurant) {
        return next(new AppError(`this order id it doesn't exist`, 404));
      }

  
    res.status(200).json({ restaurant });
  });

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
  
    const { name, address } = req.body;
  
    await restaurant.update({ name, address });
  
    res.status(200).json({ 
        status: 'success',
        data: { restaurant },
    });
  });

const deletedRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
  
    await restaurant.update({ status: 'deleted' });
  
    res.status(200).json({ status: 'success' });
  });

const createReviewRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant, sessionUser } = req;
  
    const { comment, rating } = req.body;
  
    const newReview = await Review.create({
      userId: sessionUser.id,
      comment,
      rating,
      restaurant: restaurant.id,
    });
  
    res.status(201).json({ status: 'success', newReview });
});

const updateReviewRestaurant = catchAsync(async (req, res, next) => {
    const { review } = req;
  
    const { comment, rating } = req.body;
  
    await review.update({ comment, rating });
  
    res.status(200).json({ status: 'success' });
  });

  const deletedReviewsRestaurant = catchAsync(async (req, res, next) => {
    const { review } = req;
  
    await review.update({ status: 'deleted' });
  
    res.status(200).json({ status: 'success' });
  });

module.exports={ 
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deletedRestaurant,
    createReviewRestaurant,
    updateReviewRestaurant,
    deletedReviewsRestaurant
}