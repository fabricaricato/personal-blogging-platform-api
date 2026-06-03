import { Schema, model, Document } from 'mongoose';

/**
 * TypeScript interface for an Article document in MongoDB.
 * Extends Mongoose's Document to include built-in fields like _id, __v, etc.
 */
interface IArticle extends Document {
  /** The title of the article. Required. */
  title: string;
  /** The main body/content of the article. Required. */
  content: string;
  /** Optional list of tags associated with the article. */
  tags: string[];
}

/**
 * Mongoose schema definition for the Article model.
 * Automatically adds `createdAt` and `updatedAt` timestamps.
 */
const articleSchema = new Schema(
  {
    /** Title of the article. Must be provided; cannot be empty. */
    title: { type: String, required: true },
    /** Full content of the article. Must be provided; cannot be empty. */
    content: { type: String, required: true },
    /** Array of tag strings. Defaults to an empty array if not provided. */
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

/**
 * Compiled Mongoose model for Article.
 * Used to interact with the `articles` collection in MongoDB.
 */
export default model<IArticle>('Article', articleSchema);
