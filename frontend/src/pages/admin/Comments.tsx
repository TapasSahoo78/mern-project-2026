import {
    Container,
    Typography,
    Card,
    CardContent,
    IconButton,
    Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { deleteCommentRequest } from '../../features/comments/comment.slice';
import { fetchAllCommentsRequest } from '../../features/admin/admin.slice';

const AdminComments = () => {
    const dispatch = useAppDispatch();
    const { comments, loading } = useAppSelector(
        (state: any) => state.admin
    );

    useEffect(() => {
        dispatch(fetchAllCommentsRequest());
    }, [dispatch]);

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" fontWeight={800} mb={3}>
                Comment Management
            </Typography>

            <Stack spacing={2}>
                {comments && comments.map((c:any) => (
                    <Card key={c._id}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Typography>{c.content}</Typography>
                                <Typography variant="caption">
                                    {c.author.name} • {c.content}
                                </Typography>
                            </div>

                            <IconButton
                                color="error"
                                onClick={() => {
                                    dispatch(
                                        deleteCommentRequest({
                                            commentId: c._id,
                                            postId: c.post,
                                        })
                                    );
                                    dispatch(fetchAllCommentsRequest());
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>

                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default AdminComments;
