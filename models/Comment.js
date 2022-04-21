const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Comment', CommentSchema);