const Router = require('express')
const router = new Router()
const {postsController} = require('../controllers')

router.post('/', postsController.createPost)
router.get('/', postsController.getPosts)

module.exports = router