const router = require('express').Router()
const commentController = require('../../controller/commentController')

router.post('/', commentController.create)
router.get('/:article_id', commentController.readByArticle)
router.put('/:comment_id', commentController.update)
router.delete('/:comment_id', commentController.delete)

module.exports = router