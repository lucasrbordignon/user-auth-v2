const userRepository = require('../repositories/userRepsitory')
const { encryptPassword } = require('../utils/password')

class UserService {

  async createUser(userData) {
    const { senha } = userData
    const hashedPassword = await encryptPassword(senha)
    userData.senha = hashedPassword

    return await userRepository.createUser(userData)
  }

  async getAllUsers() {
    return await userRepository.getAllUsers()
  }

  async getUserById(userId) {
    return await userRepository.getUserById(userId)
  }

  async getUserByEmail(userEmail) {
    return await userRepository.getUserByEmail(userEmail)
  }

  async updateUser(userId, updatedData) {
    return await userRepository.updateUser(userId, updatedData)
  }

  async deleteUser(userId) {
    return await userRepository.deleteUser(userId)
  }
}

module.exports = new UserService()