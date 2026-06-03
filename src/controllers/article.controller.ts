import { Request, Response } from 'express';
import Article from '../models/Article';

export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;

    const newArticle = new Article({ title, content, tags });
    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el artículo', error });
  }
};
