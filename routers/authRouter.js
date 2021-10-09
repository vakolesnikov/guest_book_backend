const Router = require('express')
const router = new Router()
const {authController} = require('../controllers')
const {check} = require('express-validator')

router.post(
    '/registration',
    [
        check('userName', 'Логин не может быть пустым').notEmpty(),
        check('password', 'Пароль не может быть пустым').notEmpty()
    ],
    authController.registration)
router.post('/login', authController.login)

module.exports = router