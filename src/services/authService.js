const userRepsitory = require("../repositories/userRepsitory")
const { checkPassword } = require("../utils/password")
const userService = require("./userService")
const jsonwebtoken = require('jsonwebtoken')

class authService {
  async verifyPassword (userEmail, userSenha) {
    const user = await userService.getUserByEmail(userEmail)

    const passwordIsValid = await checkPassword(userSenha, user.senha)

    return {passwordIsValid}
  }

  async getToken (userEmail) {
    const user = await userRepsitory.getUserByEmail(userEmail)

    return jsonwebtoken.sign({
      id: user._id,
      nome: user.nome,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24  // Expira em 1 dia
    }, 'ProtectToken')    
  }


  async logout (  ) {
    res.clearCookie('Token')
  }

  async logged (req) {
    return req.cookies.Token || null
  }
}

module.exports = new authService()