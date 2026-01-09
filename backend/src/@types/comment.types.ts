import { Types } from 'mongoose';

export interface IComment {
  content: string;
  post: Types.ObjectId;
  author: Types.ObjectId;
}
