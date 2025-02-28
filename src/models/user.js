const sequelize = require('../config/database');
const { OptimisticLockError } = require('sequelize')

const SqUserModel = sequelize.models.User;

class User {
  constructor(model) {
    this.db_model = model;
  }

  getBalance(){
    return this.db_model.balance
  }

  static async findById(id){
    let model = await SqUserModel.findByPk(id);
    if (model === null) throw new Error("user with this id not found")
    return new User(model);
  }
  
  static async create(id, balance){
    let model = await SqUserModel.create({id, balance});
    return new User(model);
  }

  async updateBalance(amount) {
    const transaction = await sequelize.transaction();
    try{
      const user = await SqUserModel.findByPk(this.db_model.id, {transaction});

      const newBalance = user.balance + amount
      if (newBalance < 0) 
        throw new Error("insufficient funds on balance")

      user.balance = newBalance;
      await user.save({transaction})
      transaction.commit()
    } catch (error) {
      transaction.rollback()
      if (error instanceof OptimisticLockError) {
        return this.updateBalance(amount)
      } else {
        throw error;
      }
    }
  }
}

module.exports = User;