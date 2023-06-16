const { body } = require('express-validator');

module.exports = validations = [
    body('email').trim().isEmail().withMessage('Incorrect email format!'),
    body('phone').trim().isMobilePhone("uk-UA").withMessage('Incorrect mobile format, should start with +380'),
    body('name').trim().isLength({ min: 3, max: 30 }).withMessage('Name must be between 3 and 30 characters'),
    body('login').trim()
        .isLength({ min: 3, max: 30 }).withMessage('Login must be between 3 and 30 characters')
        .matches(/[a-zA-Z]/).withMessage('Login must have at least 1 character')
        .isAlphanumeric().withMessage('Login must contain only letters and numbers without any gaps'),
    body('password').trim()
        .isLength({min:8,max:30}).withMessage('Password must be between 8 and 30 characters')
        .matches(/[a-z]/).withMessage('Password must have at least 1 lowercase character')
        .matches(/[A-Z]/).withMessage('Password must have at least 1 uppercase letter')
        .matches(/[0-9]/).withMessage('Password must have at least 1 number')
        .isAlphanumeric().withMessage('Login must contain only letters and numbers without any gaps')
];
