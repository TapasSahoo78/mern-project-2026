import mongoose, { Schema, Document } from 'mongoose';
import { IComment } from '../@types/comment.types';

export interface ICommentDocument extends IComment, Document { }

const CommentSchema = new Schema<ICommentDocument>(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },

        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

CommentSchema.index({ post: 1 });
CommentSchema.index({ author: 1 });

const CommentModel = mongoose.model<ICommentDocument>(
    'Comment',
    CommentSchema
);

export default CommentModel;
