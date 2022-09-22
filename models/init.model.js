//Models
const { User } = require('./user.model');
const { Meat } = require('./meat.model');
const { Order } = require('./order.model');
const { Review } = require('./review.model');
const { Restaurant } = require('./restaurant.model');

const initModels = () =>{
    //1 restaurant <-------> M Meats
    Restaurant.hasMany(Meat, {foreignKey: 'restaurantId'});
    Meat.belongsTo(Restaurant);

    //1 Restaurant <------> M Review
    Restaurant.hasMany(Review, {foreignKey: 'restaurantId'});
    Review.belongsTo(Restaurant);

    //1 User <-------> M Review
    User.hasMany(Review, {foreignKey: 'userId'});
    Review.belongsTo(User);

    //1 Meat <------> 1 Order
    Meat.belongsTo(Order, {foreignKey: 'meatId'});
    Order.belongsTo(Meat);

    // 1 User <-------> M Orders
    User.hasMany(Order, {foreignKey: 'userId'});
    Order.belongsTo(User);


};

module.exports = { initModels };