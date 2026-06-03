import { Schema, model, Document } from 'mongoose';

interface IArticle extends Document {
  title: string;
  content: string;
  tags: string[];
}

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default model<IArticle>('Article', articleSchema);
