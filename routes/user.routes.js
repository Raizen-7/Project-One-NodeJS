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
const { 
    protectSession,
    protectUsersAccount,
    userExists
} = require('../middlewares/auth.middleware');

const { orderExists } = require('../middlewares/order.middleware');

//Utils
const { createUserValidators } = require('../middlewares/validators.middleware')

const userRouter = express.Router();

//Endpoints

userRouter.post('/signup', createUserValidators, createUser );

userRouter.post('/login', login);

//Protections aplicated
userRouter.use(protectSession)

userRouter.get('/orders', getAllOrders);

userRouter.get('/orders/:id', orderExists, getOrderById);

userRouter.patch('/:id', userExists, protectUsersAccount, updateUser);

userRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);

module.exports = { userRouter };