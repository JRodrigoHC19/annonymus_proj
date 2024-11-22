const { body } = require('express-validator');
const { isEmailRegisted } = require('./database/querys');

const sets_in = {
    roles: ['1', '2', '3', '4'],
}

// Valida nuevo usuario
const SignUpCheck = function () {
    return [
        body('email')
            .trim()
            .notEmpty()
                .withMessage('Email is required')
            .isEmail()
                .withMessage('Invalid email')
            .custom( async(value) => {
                const isRegistered = await isEmailRegisted(value);
                if (isRegistered) { throw new Error('Email already registered') }
                return true;
            })
                .withMessage('Email is already registered')
        ,
        body('password')
            .trim()
            .notEmpty()
                .withMessage('Password is required')
            .isLength({ min: 6 })
                .withMessage('Password must be at least 6 characters long')
        ,
        body('role')
            .isIn(sets_in.roles)
                .withMessage('Invalid role')
    ];
};

// Validad el logeo con credenciales
const SignInCheck = function () {
    return [
        body('email')
            .trim()
            .notEmpty()
                .withMessage('Email is required')
            .isEmail()
                .withMessage('Invalid email')
        ,
        body('password')
            .trim()
            .notEmpty()
                .withMessage('Password is required')
    ]
}

module.exports = {
    SignUpCheck,
    SignInCheck
};