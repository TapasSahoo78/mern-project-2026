import CommentModel from '../models/comment.model';

interface CreateCommentInput {
  content: string;
  postId: string;
  authorId: string;
}

export const createComment = async (data: CreateCommentInput) => {
  const comment = await CommentModel.create({
    content: data.content,
    post: data.postId,
    author: data.authorId,
  });

  return comment;
};

export const getCommentsByPost = async (postId: string) => {
  return CommentModel.find({ post: postId })
    .populate('author', 'name email role')
    .sort({ createdAt: -1 });
};

export const updateComment = async (
  commentId: string,
  userId: string,
  role: string,
  content: string
) => {
  const comment = await CommentModel.findById(commentId);

  if (!comment) {
    throw new Error('Comment not found');
  }

  if (role !== 'ADMIN' && comment.author.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  comment.content = content;
  await comment.save();

  return comment;
};

export const deleteComment = async (
  commentId: string,
  userId: string,
  role: string
) => {
  const comment = await CommentModel.findById(commentId);

  if (!comment) {
    throw new Error('Comment not found');
  }

  if (role !== 'ADMIN' && comment.author.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  await comment.deleteOne();
};
