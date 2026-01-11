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
import { fetchPostsRequest, deletePostRequest } from '../../features/posts/post.slice';

const AdminPosts = () => {
    const dispatch = useAppDispatch();
    const { posts } = useAppSelector((s) => s.posts);

    useEffect(() => {
        dispatch(fetchPostsRequest({}));
    }, [dispatch]);

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" fontWeight={800} mb={3}>
                Post Management
            </Typography>

            <Stack spacing={2}>
                {posts.map((p) => (
                    <Card key={p._id}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Typography fontWeight={600}>{p.title}</Typography>
                                <Typography variant="body2">By {p.author.name}</Typography>
                            </div>

                            <IconButton
                                color="error"
                                onClick={() => dispatch(deletePostRequest(p._id))}
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

export default AdminPosts;
