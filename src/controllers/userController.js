const userService = require('../services/userService');
const { validationResult } = require('express-validator');

class UserController {
  async updateBalance(req, res) {
    
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userId, amount } = req.body;
      await userService.updateBalance(userId, amount);
      res.status(200).send("Ok")
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }
}

module.exports = new UserController();