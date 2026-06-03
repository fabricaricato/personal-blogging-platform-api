import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
  content: z.string().min(15, { message: 'Content must be at least 15 characters long' }),
  tags: z.array(z.string()).optional()
});

export const updateArticleSchema = z.object({
  title: z.string().min(5).optional(),
  content: z.string().min(15).optional(),
  tags: z.array(z.string()).optional()
});
