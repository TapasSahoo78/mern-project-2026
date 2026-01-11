import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Chip,
  IconButton,
  TextField,
  Pagination,
  Button,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import FeedIcon from '@mui/icons-material/Feed';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  fetchPostsRequest,
  deletePostRequest,
} from '../../features/posts/post.slice';

const Posts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { posts, loading, page, totalPages } =
    useAppSelector((state) => state.posts);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchPostsRequest({ page: 1, search }));
  }, [dispatch, search]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePostRequest(id));
    }
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
          <ArticleIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight={800} sx={{ flexGrow: 1 }}>
            Posts
          </Typography>

          {/* NAV LINKS */}
          <Button
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
            sx={{ mr: 1 }}
          >
            Home
          </Button>

          <Button
            component={RouterLink}
            to="/user"
            startIcon={<DashboardIcon />}
            sx={{ mr: 1 }}
          >
            Dashboard
          </Button>

          <Button
            component={RouterLink}
            to="/posts"
            startIcon={<DashboardIcon />}
            sx={{ mr: 1 }}
          >
            Posts
          </Button>

          <Button
            component={RouterLink}
            to="/posts/create"
            variant="contained"
            startIcon={<FeedIcon />}
          >
            New Post
          </Button>
        </Toolbar>
      </AppBar>

      {/* ===== CONTENT ===== */}
      <Container maxWidth="lg" sx={{ py: 5 }}>

        {/* LOADING */}
        {loading && (
          <Box
            minHeight="40vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}

        {/* EMPTY STATE */}
        {!loading && posts.length === 0 && (
          <Box textAlign="center" py={10}>
            <ArticleIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No posts found
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Try adjusting your search or create a new post.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/posts/create')}
            >
              Create First Post
            </Button>
          </Box>
        )}

        {/* POSTS LIST */}
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={post._id}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.content}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Chip label={post.author.name} size="small" />

                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(`/posts/edit/${post._id}`)
                        }
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(post._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={5}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) =>
                dispatch(fetchPostsRequest({ page: value, search }))
              }
              color="primary"
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Posts;
