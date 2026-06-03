import { Request, Response } from 'express';
import Article from '../models/Article';
import { createArticleSchema, updateArticleSchema } from '../validators/article.schema';

/**
 * GET /api/articles
 * Retrieves all articles from the database.
 * Supports optional tag filtering via the `tag` query parameter.
 *
 * @example GET /api/articles?tag=typescript
 * @returns 200 - Array of article documents
 * @returns 500 - Internal server error
 */
const getAllArticles = async (req: Request, res: Response) => {
  try {
    // Build a dynamic filter object; only add `tags` filter if a query param is present
    const filter: any = {};
    if (req.query.tag) {
      filter.tags = req.query.tag;
    }
    const articles = await Article.find(filter);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
};

/**
 * POST /api/articles
 * Creates a new article after validating the request body with Zod.
 *
 * @returns 201 - { success: true, data: newArticle }
 * @returns 400 - Validation errors with field-level details
 * @returns 500 - Internal server error
 */
const createArticle = async (req: Request, res: Response) => {
  // Validate request body against the create schema
  const validation = createArticleSchema.safeParse(req.body);

  if (!validation.success) {
    // Return structured field errors so the client knows exactly what's wrong
    return res.status(400).json({ success: false, error: validation.error.flatten().fieldErrors });
  }

  try {
    const newArticle = new Article(validation.data);
    await newArticle.save();

    res.status(201).json({ success: true, data: newArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating article', error });
  }
};

/**
 * GET /api/articles/:id
 * Retrieves a single article by its MongoDB ObjectId.
 *
 * @param req.params.id - The MongoDB ObjectId of the article
 * @returns 200 - The article document
 * @returns 404 - Article not found
 * @returns 500 - Internal server error
 */
const getArticleById = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
};

/**
 * PATCH /api/articles/:id
 * Partially updates an existing article after validating the request body with Zod.
 * Only the fields provided in the body will be updated.
 *
 * @param req.params.id - The MongoDB ObjectId of the article to update
 * @returns 200 - { success: true, data: updatedArticle }
 * @returns 400 - Validation errors with field-level details
 * @returns 404 - Article not found
 * @returns 500 - Internal server error
 */
const updateArticle = async (req: Request, res: Response) => {
  // Validate request body against the update schema (all fields are optional)
  const validation = updateArticleSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ success: false, error: validation.error.flatten().fieldErrors });
  }

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      validation.data,
      { new: true } // Return the updated document instead of the original
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ success: true, data: updatedArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating article', error });
  }
};

/**
 * DELETE /api/articles/:id
 * Permanently deletes an article by its MongoDB ObjectId.
 *
 * @param req.params.id - The MongoDB ObjectId of the article to delete
 * @returns 200 - Confirmation message
 * @returns 404 - Article not found
 * @returns 500 - Internal server error
 */
const deleteArticle = async (req: Request, res: Response) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error });
  }
};

export { getAllArticles, createArticle, getArticleById, updateArticle, deleteArticle };