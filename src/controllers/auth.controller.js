const authService = require('../services/authService')
const userService = require('../services/userService')

const authController = {
   login: async (req, res, next) => {
    const { email, senha } = req.body 

    if (!email) {
      const erro = new Error('Dados de entrada inválidos.')
      erro.statusCode = 400
      erro.details = {
        fiel: 'Email',
        message: 'Email deve ser informado'
      }
      return next(erro)
    }

    if (!senha) {
      const erro = new Error('Dados de entrada inválidos.')
      erro.statusCode = 400
      erro.details = {
        fiel: 'Senha',
        message: 'Senha deve ser informada'
      }
      return next(erro)
    }

    const isFound = await userService.getUserByEmail(email)

    if (!isFound) {
      const erro = new Error('Não foi possível efetuar o login.')
      erro.statusCode = 400
      erro.details = {
        fiel: 'Email',
        message: 'Usuário não encontrado'
      }
      return next(erro)
    }    

    const passwordIsValid = await authService.verifyPassword(email, senha)

    if (!passwordIsValid) {
      const erro = new Error('Não foi possível efetuar o login.')
      erro.statusCode = 422
      erro.details = {
        fiel: 'Senha',
        message: 'Senha inválida'
      }
      return next(erro)
    } 

    const userToken = await authService.getToken(email)

    if (!userToken) {
      const erro = new Error('Não foi possível efetuar o login.')
      erro.statusCode = 400
      erro.details = {
        fiel: 'Token',
        message: 'Token gerado incorretamente'
      }
      return next(erro)
    }

    userToken.Exp = 'Expira em 1 dia'

    res.cookie('Token', userToken)
    res.status(200).send({status: 'success', data: {userToken}, message: 'Autenticação realizada com sucesso.'})
  },

  logout: async (req, res) => {    
    await authService.logout()
    res.status(200).send('Cookie limpo com sucesso')
  },

  logged: async (req, res, next) => {

    const auth = await authService.logged(req)

    if (!auth) {
      const erro = new Error('Usuário não se encontra logado.')
      erro.statusCode = 400
      erro.details = {
        fiel: 'login',
        message: 'Usuário não se encontra logado'
      }
      return next(erro)
    } 
    
    return res.status(200).send({status: 'success', message: 'Usuário logado'})
  }
}

module.exports = authController