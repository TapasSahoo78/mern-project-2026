import UserModel from '../models/user.model';
import PostModel from '../models/post.model';
import CommentModel from '../models/comment.model';

export const getDashboardStats = async () => {
    const usersCount = await UserModel.countDocuments();
    const postsCount = await PostModel.countDocuments({ isDeleted: false });
    const commentsCount = await CommentModel.countDocuments();

    return {
        users: usersCount,
        posts: postsCount,
        comments: commentsCount,
    };
};

export const getAllUsers = async () => {
    return UserModel.find().select('-password').sort({ createdAt: -1 });
};

export const updateUserRole = async (userId: string, role: 'ADMIN' | 'USER') => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    user.role = role;
    await user.save();

    return user;
};

export const deleteUser = async (userId: string) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    await user.deleteOne();
};

export const adminDeletePost = async (postId: string) => {
    const post = await PostModel.findById(postId);

    if (!post) {
        throw new Error('Post not found');
    }

    post.isDeleted = true;
    post.deletedAt = new Date();
    await post.save();
};

export const adminDeleteComment = async (commentId: string) => {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
        throw new Error('Comment not found');
    }

    await comment.deleteOne();
};
