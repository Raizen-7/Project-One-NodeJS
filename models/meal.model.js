const { db, DataTypes } = require('../utils/database.util');

const Meal = db.define('meat',{
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    restaurantId: {
        type: DataTypes.INTEGER,
		allowNull: false,
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
});

module.exports = { Meal };