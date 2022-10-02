const express = require('express');

//Controllers



//Middleware



//Endpoints

const restRouter = express.Router();

//Obtener todos los restaurants con status active
restRouter.get('/');
//Obtener restaurant por id
restRouter.get('/:id');

//habilitar protección con middleware


//crear restaurante
restRouter.post('/');

//Actualizar restaurant (name, address), ÚNICAMENTE EL ADMIN PUEDE REALIZAR
restRouter.patch('/:id');
//soft delete ÚNICAMENTE EL ADMIN PUEDE REALIZAR
restRouter.delete('/:id');
//crear reseñas de restaurantes
restRouter.post('/reviews/:restaurantId');
//Actualizar una reseña hecha en un restaurant, siendo :id el id de la reseña (comment, rating) SOLO EL AUTOR DE LA RESEÑA PUEDE ACTUALIZAR SU PROPIA RESEÑA
restRouter.patch('/reviews/:id');

restRouter.delete('/reviews/:id');