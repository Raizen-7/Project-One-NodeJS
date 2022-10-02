const { Order } = require('../models/order.model');

// UTILS
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const orderExists = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findOne({
    where: { status: 'active', id: orderId },
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  req.orderData = order;

  next();
});

module.exports = { orderExists };