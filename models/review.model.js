const { db, DataTypes } = require('../utils/database.util');

const Review = db.define('review', {
	id: {
        allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	userId: {
        allowNull: false,
		type: DataTypes.INTEGER,
	},
	restaurantId: {
        allowNull: false,
		type: DataTypes.INTEGER,
	},
	comment: {
        allowNull: false,
		type: DataTypes.STRING,
	},
	status: {
        allowNull: false,
		type: DataTypes.STRING,
		defaultValue: 'active',
	},
});

module.exports = { Review };
module.exports = { Restaurant };