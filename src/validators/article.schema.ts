import { z } from 'zod';

/**
 * Zod validation schema for creating a new article.
 * All fields are required unless explicitly marked optional.
 */
export const createArticleSchema = z.object({
  /** Article title. Must be at least 5 characters long. */
  title: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
  /** Article content. Must be at least 15 characters long. */
  content: z.string().min(15, { message: 'Content must be at least 15 characters long' }),
  /** Optional list of tags. Each tag must be a string. */
  tags: z.array(z.string()).optional()
});

/**
 * Zod validation schema for partially updating an existing article.
 * All fields are optional to support partial (PATCH) updates.
 */
export const updateArticleSchema = z.object({
  /** Updated title. If provided, must be at least 5 characters long. */
  title: z.string().min(5).optional(),
  /** Updated content. If provided, must be at least 15 characters long. */
  content: z.string().min(15).optional(),
  /** Updated list of tags. Each tag must be a string. */
  tags: z.array(z.string()).optional()
});
