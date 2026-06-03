import { Router } from 'express';
import { getAllArticles, createArticle, getArticleById, updateArticle, deleteArticle } from '../controllers/article.controller';

/**
 * Express Router for article-related endpoints.
 * All routes are mounted at /api/articles in index.ts.
 *
 * Routes:
 *  GET    /          → getAllArticles   (supports ?tag= query filter)
 *  POST   /          → createArticle
 *  GET    /:id       → getArticleById
 *  PATCH  /:id       → updateArticle
 *  DELETE /:id       → deleteArticle
 */
const articleRouter = Router();

// Collection routes
articleRouter.get('/', getAllArticles);
articleRouter.post('/', createArticle);

// Single-resource routes (identified by MongoDB ObjectId)
articleRouter.get('/:id', getArticleById);
articleRouter.patch('/:id', updateArticle);
articleRouter.delete('/:id', deleteArticle);

export {articleRouter};
