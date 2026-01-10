import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from '../@types/post.types';

export interface IPostDocument extends IPost, Document { }

const PostSchema = new Schema<IPostDocument>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },

        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

PostSchema.index({ slug: 1 });
PostSchema.index({ author: 1 });
PostSchema.index({ isDeleted: 1 });

PostSchema.pre<IPostDocument>('validate', function (next) {
    if (!this.isModified('title')) return;

    this.slug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
});

const PostModel = mongoose.model<IPostDocument>('Post', PostSchema);
export default PostModel;
