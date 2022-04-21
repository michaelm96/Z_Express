const Comment = require("../../models/Comment");
const Article = require("../../models/Article");
const moment = require("moment");

class CommentController {
    static async create(req, res, next) {
        const { article_id, content } = req.body;

        if (!article_id) {
            return res.status(400).json({
                message: "Article id is missing",
            });
        }
        if (!content) {
            return res.status(400).json({
                message: "content is missing",
            });
        }

        try {
            const article = await Article.findById(article_id);

            if (!article) {
                return res.status(404).json({
                    message: "The article is not found",
                });
            }

            
            const comment = new Comment({
                articleId: article_id,
                content: content,
                createdAt: moment(),
                updatedAt: moment(),
            });
            await article.comments.push(comment);
            await article.save();
            await comment.save();

            return res.status(201).json({
                message: "Comment successfuly created",
            });
        } catch (error) {
            console.log(error, "@create comment error");
            return res.status(500).json({
                error,
            });
        }
    }
    static async readByArticle(req, res, next) {
        const { article_id } = req.params;

        if (!article_id) {
            return res.status(400).json({
                message: "Article id is missing",
            });
        }

        try {
            const comments = await Comment.find({ articleId: article_id });

            return res.status(200).json({
                message: "Comment successfuly retrieved",
                comments,
            });
        } catch (error) {
            console.log(error, "@read comment error");
            return res.status(500).json({
                error,
            });
        }
    }
    
    static async update(req, res, next) {
        const { comment_id } = req.params;
        const { content } = req.body;

        if (!comment_id) {
            return res.status(400).json({
                message: "Comment id is missing",
            });
        }
        if (!content) {
            return res.status(400).json({
                message: "content is missing",
            });
        }
        try {
            const comment = await Comment.findById(comment_id);

            if (!comment) {
                return res.status(404).json({
                    message: "comment is not found",
                });
            }

            comment.content = content;
            comment.updatedAt = moment();
            await comment.save();

            return res.status(200).json({
                message: "Comment successfuly updated",
            });
            
        } catch (error) {
            console.log(error, "@update comment error");
            return res.status(500).json({
                error,
            });
        }
    }
    static async delete(req, res, next) {
        const { comment_id } = req.params;

        if (!comment_id) {
            return res
                .status(400)
                .json({ message: "missing fields comment id" });
        }
        try {
            const comment = await Comment.findById(comment_id);
            if (!comment) {
                return res.status(404).json({
                    message: "the comment not found",
                });
            }

            await comment.remove();
            return res.status(200).json({
                message: "Successfully deleted the comment",
            });
        } catch (error) {
            console.log(error, "@delete comment error");
            return res.status(500).json({
                error,
            });
        }
    }
}

module.exports = CommentController;
