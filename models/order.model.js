const { db, DataTypes } = require('../utils/database.util');

const Order = db.define('order', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	meatId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	restaurantId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
    totalPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL
    },
    quantity:{
        type: DataTypes.INTEGER,
		allowNull: false,
    },
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Order };