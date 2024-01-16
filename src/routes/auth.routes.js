const router = require('express').Router()
const authController = require('../controllers/auth.controller')

router.post('/auth/login', authController.login)
router.get('/auth/logout', authController.logout)
router.get('/auth/logged', authController.logged)

module.exports = router;