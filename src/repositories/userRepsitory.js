const userModel = require('../models/User')

class UserRepository {
  async createUser(userData) {
    const newUser = new userModel(userData);
    return await newUser.save()
  }

  async getAllUsers() {
    return await userModel.find()
  }

  async getUserById (userId) {
    return await userModel.findById(userId)
  }

  async getUserByEmail (userEmail) {
    return await userModel.findOne({email: userEmail})
  }

  async updateUser(userId, updatedData) {
    return await userModel.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true })
  }

  async deleteUser(userId) {
    return await userModel.findByIdAndDelete(userId)
  }
}

module.exports = new UserRepository()