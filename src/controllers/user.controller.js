const userService = require('../services/userService')

const userController = {

  createUser: async ( req, res, next) => {   
    const { nome, email, senha } = req.body

    if (!nome) {
      const erro = new Error('Dados de entrada inválidos.')
      erro.statusCode = 400
      erro.details = {
        fiel: 'nome',
        message: 'Nome deve ser preenchido'
      }
      return next(erro)
    }

    if (!email) {
      const erro = new Error('Dados de entrada inválidos.')
      erro.statusCode = 400
      erro.details = {
        fiel: 'Email',
        message: 'Email deve ser preenchido'
      }
      return next(erro)
    }

    if (!senha) {
      const erro = new Error('Dados de entrada inválidos.')
      erro.statusCode = 400
      erro.details = {
        fiel: 'Senha',
        message: 'Senha deve ser preenchida'
      }
      return next(erro)
    }

    const isFound = userService.getUserByEmail()

    if (isFound) {
      const erro = new Error('Não foi possível cadastrar usuário.')
      erro.statusCode = 400
      erro.details = {
        fiel: 'Email',
        message: 'Email já se encontra cadastrado'
      }
      return next(erro)
    }

    const user = await userService.createUser(req.body)
    res.status(201).send({status: 'sucess', data: {user}, message: 'User created successfully.'})

  },

  getAllUsers: async (req, res) => { 
    try{
      const users = await userService.getAllUsers()    

      res.send(users)

    } catch (error) {
      res.status(500).send(error.message)
    }
  },

  getUserById: async (req, res) => { 
    try{
      const user = await userService.getUserById(req.params.id)     

      if (!user) return res.status(404).send()

      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  },

  updateUser: async (req, res) => { 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['nome', 'email', 'senha']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({error: 'Atualização inválida'})    

    try {
      const user = await userService.updateUser(req.params.id, req.body)

      if (!user) return res.status(404).send()
      
      res.send(user)
    } catch (error) {
      res.status(400).send(error)
    }
  },

  deleteUser: async (req, res) => { 
    try{
      const user = await userService.deleteUser(req.params.id)
      
      if (!user) return res.status(404).send()

      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

module.exports = userController