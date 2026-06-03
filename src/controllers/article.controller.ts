import { Request, Response } from 'express';
import Article from '../models/Article';

const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();
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

export {getAllArticles, createArticle};