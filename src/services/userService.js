const User = require('../models/user');

class UserService {
  async updateBalance(userId, amount) {
    const user = await User.findById(userId);
    await user.updateBalance(amount)
  }
}

module.exports = new UserService();