const Router = require('express')
const router = new Router()
const {usersController} = require('../controllers')

router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUser)

module.exports = router