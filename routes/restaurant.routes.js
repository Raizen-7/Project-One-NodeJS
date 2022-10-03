const express = require('express');

//Controllers
const {
createRestaurant,
getAllRestaurants,
getRestaurantById,
updateRestaurant,
deletedRestaurant,
createReviewRestaurant,
deletedReviewsRestaurant,
updateReviewRestaurant
} = require('../controller/restorant.controller')


//Middleware
const { restaurantExists } = require('../middlewares/restaurant.middleware');
const {
    reviewExists,
    protectOwnerReview
} = require('../middlewares/review.middleware');

const {
    createRestaurantValidations,
    createReviewValidations,
    checkValidations
} = require('../middlewares/validators.middleware');

const { protectAdmin } = require('../middlewares/auth.middleware');

const { protectToken } = require('../middlewares/users.middleware');

//Endpoints

const restRouter = express.Router();

//Obtener todos los restaurants con status active
restRouter.get('/', getAllRestaurants );
//Obtener restaurant por id
restRouter.get('/:id',restaurantExists,  getRestaurantById );

//habilitar protección con middleware

restRouter.use(protectToken);

//Restaurant
restRouter.post(
    '/',
    protectAdmin,
    createRestaurantValidations,
    checkValidations,
    createRestaurant,
);

restRouter.patch('/:id', protectAdmin, restaurantExists, updateRestaurant );
//soft delete 
restRouter.delete('/:id', protectAdmin, restaurantExists, deletedRestaurant );
//Review
restRouter.post('/reviews/:restaurantId', createReviewValidations, createReviewRestaurant );

restRouter.patch('/reviews/:id', reviewExists, protectOwnerReview, updateReviewRestaurant );
//soft delete 
restRouter.delete('/reviews/:id', reviewExists, protectOwnerReview, deletedReviewsRestaurant );

module.exports = { restRouter };