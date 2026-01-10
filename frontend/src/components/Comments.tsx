import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
    fetchCommentsRequest,
    createCommentRequest,
    deleteCommentRequest,
} from '../features/comments/comment.slice';

interface Props {
    postId: string;
}

const Comments = ({ postId }: Props) => {
    const dispatch = useAppDispatch();
    const { comments, loading } = useAppSelector((s) => s.comments);
    const { isAuthenticated, user } = useAppSelector((s) => s.auth);

    const [content, setContent] = useState('');

    useEffect(() => {
        dispatch(fetchCommentsRequest({ postId }));
    }, [dispatch, postId]);

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createCommentRequest({ postId, content }));
        setContent('');
    };

    const canDelete = (commentAuthorEmail: string) => {
        if (!user) return false;
        return user.role === 'ADMIN' || user.email === commentAuthorEmail;
    };

    return (
        <div style={{ marginTop: 16 }}>
            <h4>Comments</h4>

            {loading && <p>Loading comments...</p>}

            {comments.map((comment) => (
                <div
                    key={comment._id}
                    style={{
                        borderTop: '1px solid #eee',
                        padding: '8px 0',
                    }}
                >
                    <p>{comment.content}</p>
                    <small>By {comment.author.name}</small>

                    {canDelete(comment.author.email) && (
                        <button
                            style={{ marginLeft: 10 }}
                            onClick={() =>
                                dispatch(deleteCommentRequest({ commentId: comment._id }))
                            }
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}

            {/* Add comment only if authenticated */}
            {isAuthenticated ? (
                <form onSubmit={submitComment} style={{ marginTop: 10 }}>
                    <input
                        placeholder="Write a comment..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type="submit">Comment</button>
                </form>
            ) : (
                <p style={{ color: '#666' }}>
                    Login to add a comment
                </p>
            )}
        </div>
    );
};

export default Comments;
