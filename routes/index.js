const router = require('express').Router()
const articlesRoutes = require('./articlesRoutes')
const commentsRoutes = require('./commentsRoutes')

router.use('/articles', articlesRoutes)
router.use('/comments', commentsRoutes)


module.exports = router