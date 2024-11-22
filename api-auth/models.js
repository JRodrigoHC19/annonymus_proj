const { DataTypes } = require('sequelize');
const { sequelize } = require('./database/connection');


// Usuario Base
const User = sequelize.define('User', {
    // username: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: ['1', '2', '3', '4'],
        allowNull: false,
        defaultValue: '1'
    }
    // ,profile_url: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     defaultValue: ''
    // },
    // details: {
    //     type: DataTypes.TEXT,
    //     allowNull: false,
    //     defaultValue: ''
    // }
}, {
    timestamps: true,
    tableName: 'usuarios'
});


module.exports = {
    User
};