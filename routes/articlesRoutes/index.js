const router = require('express').Router()
const articleController = require('../../controller/articleController')

router.post('/', articleController.create)
router.get('/', articleController.read)
router.delete('/:article_id', articleController.delete)

module.exports = router