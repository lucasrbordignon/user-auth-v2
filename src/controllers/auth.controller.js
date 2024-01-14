const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/User')
const helpers = require('../utils/password')

const authController = {
  login: async (req, res) => {
    const { email, senha } = req.body 

    if (!email || !senha) return res.status(400).send({erro: 'Dados insufientes.'})    

    const user = await User.findOne({ email: email })

    if (!user) return res.status(404).send({ msg: 'Usuário não encontrado!' })
  
    const checkPassword = helpers.checkPassword(senha, user.senha)

    if (!checkPassword) return res.status(422).send({ msg: 'Senha inválida' })  

    try {
      const Token = jsonwebtoken.sign({
        id: user._id,
        nome: user.nome,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24  // Expira em 1 dia
      }, 'ProtectToken')
      
      res.cookie('Token', Token)
      res.status(200).send({msg: 'Autenticação realizada com sucesso!.', Token, Exp: 'Expira em 1 dia'})

    } catch (error) {
      res.status(500).send({ msg:  error.message})
    }
  },

  logout: async (req, res) => {    
    res.clearCookie('Token')
    res.status(200).send('Cookie limpo com sucesso')
  },

  logged: async (req, res, next) => {

    const auth = req.cookies.Token || null

    if (auth) {
      return res.status(200).send({msg: { login: 'Autorizado'} })
    } else {
      return res.status(400).send({error: { login: 'Não autorizado'} })
    }
   
  }
}

module.exports = authController