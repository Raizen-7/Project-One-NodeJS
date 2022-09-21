const { db, DataTypes } = require('../utils/database.util');

const Restaurant = db.define('restaurante', {
    id:{
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    address: {

    },
    rating:{

    },
    status:{
        allowNull: false,
        type: DataTypes.STRING,
		defaultValue: 'active',
    },
});

module.exports = { Restaurant };