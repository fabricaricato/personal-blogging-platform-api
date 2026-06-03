import { Router } from 'express';
import {getAllArticles, createArticle} from '../controllers/article.controller';

const articleRouter = Router();

articleRouter.get('/', getAllArticles);
articleRouter.post('/', createArticle);

export {articleRouter};
