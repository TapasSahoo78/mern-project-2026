import { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Card,
    CardContent,
    Box,
    CircularProgress,
    Divider,
    TextField,
    Button,
    IconButton,
    Avatar,
    Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchPostRequest } from '../../features/posts/post.slice';
import {
    createCommentRequest,
    updateCommentRequest,
    deleteCommentRequest,
} from '../../features/comments/comment.slice';

const PostDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { selectedPost, loading } = useAppSelector((s) => s.posts);
    const { user, isAuthenticated } = useAppSelector((s) => s.auth);

    const [comment, setComment] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        if (id) dispatch(fetchPostRequest(id));
    }, [dispatch, id]);

    if (loading || !selectedPost) {
        return (
            <Box minHeight="70vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </Box>
        );
    }

    /* ===== COMMENT HANDLERS ===== */

    const handleAddComment = () => {
        if (!comment.trim()) return;

        dispatch(createCommentRequest({ postId: selectedPost.data._id, content: comment }));
        dispatch(fetchPostRequest(selectedPost.data._id));
        setComment('');
    };

    const handleUpdateComment = (commentId: string) => {
        dispatch(
            updateCommentRequest({
                commentId: commentId,
                postId: selectedPost._id,
                content: editingText,
            })
        );

        setEditingId(null);
        setEditingText('');
    };

    const handleDeleteComment = (commentId: any) => {
        if (window.confirm('Delete this comment?')) {
            dispatch(
                deleteCommentRequest({
                    commentId: commentId,
                    postId: selectedPost._id,
                })
            );

        }
    };

    const canModify = (authorId: string) =>
        user?.role === 'ADMIN' || user?.id === authorId;

    return (
        <>
            {/* ===== HEADER ===== */}
            <AppBar position="sticky" elevation={0}>
                <Toolbar>
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" fontWeight={800}>
                        Post Details
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* ===== CONTENT ===== */}
            <Container maxWidth="md" sx={{ py: 5 }}>
                {/* POST */}
                <Card sx={{ borderRadius: 4, mb: 4 }}>
                    <CardContent>
                        <Typography variant="h4" fontWeight={800} gutterBottom>
                            {selectedPost?.data?.title}
                        </Typography>

                        <Typography color="text.secondary" mb={3}>
                            By {selectedPost?.data?.author?.name}
                        </Typography>

                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                            {selectedPost?.data?.content}
                        </Typography>
                    </CardContent>
                </Card>

                {/* COMMENTS */}
                <Typography variant="h6" fontWeight={700} mb={2}>
                    Comments ({selectedPost?.data?.comments.length})
                </Typography>

                {/* ADD COMMENT */}
                {isAuthenticated ? (
                    <Box display="flex" gap={2} mb={4}>
                        <TextField
                            fullWidth
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={handleAddComment}
                        >
                            Post
                        </Button>
                    </Box>
                ) : (
                    <Box mb={4}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate('/login')}
                        >
                            Login to comment
                        </Button>
                    </Box>
                )}

                {/* COMMENT LIST */}
                <Stack spacing={3}>
                    {selectedPost.data.comments.map((c: any) => (
                        <Card key={c._id} variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Box display="flex" gap={2} alignItems="center">
                                    <Avatar>{c.author.name[0]}</Avatar>

                                    <Box flex={1}>
                                        <Typography fontWeight={600}>
                                            {c.author.name}
                                        </Typography>

                                        {editingId === c._id ? (
                                            <>
                                                <TextField
                                                    fullWidth
                                                    value={editingText}
                                                    onChange={(e) => setEditingText(e.target.value)}
                                                    sx={{ mt: 1 }}
                                                />
                                                <Box mt={1}>
                                                    <Button
                                                        size="small"
                                                        onClick={() => handleUpdateComment(c._id)}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        color="inherit"
                                                        onClick={() => setEditingId(null)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </>
                                        ) : (
                                            <Typography variant="body2" mt={0.5}>
                                                {c.content}
                                            </Typography>
                                        )}
                                    </Box>

                                    {canModify(c.author._id) && (
                                        <Box>
                                            <IconButton
                                                onClick={() => {
                                                    setEditingId(c._id);
                                                    setEditingText(c.content);
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteComment(c._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </>
    );
};

export default PostDetails;
