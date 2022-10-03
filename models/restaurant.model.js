const { db, DataTypes } = require('../utils/database.util');

const Restaurant = db.define('restaurante', {
    id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    rating:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    status:{
        allowNull: false,
        type: DataTypes.STRING,
		defaultValue: 'active',
    },
});

module.exports = { Restaurant };