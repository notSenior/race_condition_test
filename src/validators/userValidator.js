const { body } = require('express-validator');

const userValidator = [
  body('userId').isInt().withMessage('userId is not a number'),
  body('amount').isInt().withMessage('amount is not a number'),
];

module.exports = userValidator;