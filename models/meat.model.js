const { db, DataTypes } = require('../utils/database.util');

const Meat = db.define('meat',{
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
        type: DataTypes.DECIMAL
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

module.exports = { Meat };