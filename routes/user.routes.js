const express = require('express');

//controllers
const { 
    getAllOrders,
    createOrder,
    updateOrderr,
    deleteOrder,
    login,
} = require('../controller/user.controller')
;
//Middleware

const userRouter = express.Router();

userRouter.post('/signup', updateOrderr);

userRouter.post('/login', login);

userRouter.patch('/:id', createOrder);

userRouter.delete('/:id', deleteOrder);

userRouter.get('/orders', getAllOrders);

userRouter.get('/orders/:id');

module.exports = { userRouter };