const { User, Client, Company } = require('../models');
const { sequelize } = require('../database/connection');
const bcrypt = require('bcryptjs');

const createUser = async function (data) {
    const transaction = await sequelize.transaction(); // Crear una transacción
    try {
        const hashed_password = await bcrypt.hash(data.password, 10);

        const new_user = await User.create(
            { ...data, password: hashed_password }, 
            { transaction }
        );
       
        const json_user = new_user.toJSON();

        await transaction.commit();

        return {
            id: json_user.id,
            email: json_user.email,
            role: json_user.role
        };
    } catch (error) {
        await transaction.rollback();
        return { code: -1, msg: error.message };
    }
};


// get del logeo - uso del token publico
const getUserByIdAndEmailAndRole = async function (id, email, role) {
    try {
        const user = await User.findOne({ where: { id: id, email: email, role: role } });
        if (!user) { return { code: 0, status: 403, msg: "Invalid Token" } }
        return { code: 1, status: 403, msg: "OK, Token" };
    } catch (error) {
        return { code: -1, status: 500, msg: error.message };
    }
}


// post de logeo de usuario - uso de credenciales
const getUserByEmailAndPassword = async function (email, password) {
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) { return { code: 0, status: 401, msg: "ningun usuario encontrado!" }}
        
        const validPwd = await bcrypt.compare(password, user.password);
        if (!validPwd) { return { code: 0, status: 401, msg: "Contraseña incorrecta!" }}

        const json_user = user.toJSON();
        delete json_user.password;

        return { code: 1, status: 200, user: json_user };
    } catch (error) {
        console.error("Error:", error);
        return { code: -1, status: 500, msg: error.message };
    }
}


const isEmailRegisted = async function (email) {
    try {
        const user = await User.findOne({ where: { email }, attributes: ['id'] });
        return !!user;
    } catch (error) {
        return { code: -1, msg: error.message };
    }
}

module.exports = {
    getUserByEmailAndPassword,
    getUserByIdAndEmailAndRole,
    isEmailRegisted,
    createUser,
};