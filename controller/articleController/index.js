const Article = require("../../models/Article");
const moment = require("moment");

class ArticleController {
    static async create(req, res, next) {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "missing fields" });
        }

        try {
            const article = new Article({
                title: title,
                description: description,
                createdAt: moment(),
                updatedAt: moment(),
                comments: [],
            });

            await article.save();

            return res.status(201).json({
                message: "Article successfuly created",
            });
        } catch (error) {
            console.log(error, "@create article error");
            return res.status(500).json({
                error,
            });
        }
    }
    static async read(req, res, next) {
        const sort = req.query.sort || 1;
        const sortField = req.query.sortField || "title";
        const limit = req.query.limit || 10;
        const page = req.query.page || 0;
        const offset = page * limit;

        try {
            const articles = await Article.find()
                .sort({[sortField]: sort})
                .skip(offset)
                .limit(Number(limit));

            return res.status(200).json({
                message: "Successfully retrieved articles",
                articles
            });
        } catch (error) {
            console.log(error, "@read article error");
            return res.status(500).json({
                error,
            });
        }
    }
    static async delete(req, res, next) {
        const { article_id } = req.params;

        if (!article_id) {
            return res
                .status(400)
                .json({ message: "missing fields article id" });
        }
        try {
            const article = await Article.findById(article_id);
            if (!article) {
                return res.status(404).json({
                    message: "the article not found",
                });
            }

            await article.remove();
            return res.status(200).json({
                message: "Successfully deleted the article",
            });
        } catch (error) {
            console.log(error, "@delete article error");
            return res.status(500).json({
                error,
            });
        }
    }
}

module.exports = ArticleController;
