const express = require('express');

//CONTROLLER
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deletedOrder,
} = require('../controller/order.controller');

//MIDDLEWARES

const {
  protectAccountOwner,
  protectToken
} = require('../middlewares/users.middleware')

const { orderExists } = require('../middlewares/order.middleware');

const orderRouter = express.Router();

//ENDPONINTS
router.use(protectToken);

router.post('/', createOrder);

router.get('/me', getAllOrders);

router.patch('/:orderId', protectAccountOwner, orderExists, updateOrder);

router.delete('/:orderId', protectAccountOwner, orderExists, deletedOrder);

module.exports = { orderRouter };
