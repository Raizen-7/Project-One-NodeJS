const express = require('express');

//CONTROLLER
const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deletedMeal,
} = require('../controller/meal.controller');

//MIDDLEWARES
const { mealExists } = require('../middlewares/meal.middleware');
const { restaurantExists } = require('../middlewares/restaurant.middleware');
const { protectToken } = require('../middlewares/users.middleware');
const { protectAdmin } = require('../middlewares/auth.middleware')
const {
    createMealValidations,
    checkValidations,
} = require('../middlewares/validators.middleware');

const mealsRouter = express.Router();

//ENDPONINTS
router.get('/', getAllMeals);

router.get('/:mealId', getMealById);

router.use(protectToken, protectAdmin);

router.post(
  '/:restaurantId',
  restaurantExists,
  createMealValidations,
  checkValidations,
  createMeal
);

router.patch('/:mealId', mealExists, updateMeal);

router.delete('/:mealId', mealExists, deletedMeal);

module.exports = { mealsRouter };