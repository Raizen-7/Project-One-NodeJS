const express = require('express');

//controllers
const { 
    createUser,
    updateUser,
    deleteUser,
    login,
    getAllOrders,
    getOrderById,
} = require('../controller/user.controller')
;
//Middleware

const userRouter = express.Router();

userRouter.post('/signup', createUser );

userRouter.post('/login', login);

userRouter.get('/orders', getAllOrders);

userRouter.get('/orders/:id', getOrderById);


userRouter.patch('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

module.exports = { userRouter };