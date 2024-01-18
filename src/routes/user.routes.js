const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const authenticateToken = require('../middleware/autenticateToken')

router.post('/users', authenticateToken, userController.createUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getUserById)
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router;