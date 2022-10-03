const express = require('express');

//Routers
const { userRouter } = require('./routes/user.routes');
const { restRouter } = require('./routes/restaurant.routes');
const { orderRouter } = require('./routes/order.routes');

//init express
const app = express();
//Enable use JSON
app.use(express.json());

//controller
const { globalErrorHandler } =require('./controller/error.controller');


//Define endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restRouter );
app.use('/api/v1/orders', orderRouter );
app.use('/api/v1/meals',  );

//Global error Handdler
app.use(globalErrorHandler);

module.exports = { app };