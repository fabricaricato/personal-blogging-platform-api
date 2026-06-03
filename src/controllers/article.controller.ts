import { Request, Response } from 'express';
import Article from '../models/Article';

const getAllArticles = async (req: Request, res: Response) => {
  try {
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

const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;

    const newArticle = new Article({ title, content, tags });
    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error });
  }
};

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

const updateArticle = async (req: Request, res: Response) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error });
  }
};

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