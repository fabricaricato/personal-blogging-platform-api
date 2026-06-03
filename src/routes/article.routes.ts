import { Router } from 'express';
import { getAllArticles, createArticle, getArticleById, updateArticle, deleteArticle } from '../controllers/article.controller';

const articleRouter = Router();

articleRouter.get('/', getAllArticles);
articleRouter.post('/', createArticle);
articleRouter.get('/:id', getArticleById);
articleRouter.patch('/:id', updateArticle);
articleRouter.delete('/:id', deleteArticle);

export {articleRouter};
