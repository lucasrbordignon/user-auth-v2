const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.post('/users',userController.createUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getUserById)
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router;