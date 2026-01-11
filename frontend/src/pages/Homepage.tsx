import { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CircularProgress,
  Button,
  AppBar,
  Toolbar,
  CssBaseline,
  Fade,
  Grow,
  Paper,
  IconButton,
  alpha,
  useScrollTrigger
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchPostsRequest } from '../features/posts/post.slice';

// Header Component
const Header = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                '&:hover': { opacity: 0.9 }
              }}
            >
              BlogSpace
            </Typography>
          </Box>

          <Box display="flex" gap={1}>
            {isAuthenticated ? (
              <Button
                component={RouterLink}
                to="/user"
                variant="outlined"
                color="inherit"
                startIcon={<DashboardIcon />}
                sx={{
                  borderRadius: 50,
                  px: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  color="inherit"
                  startIcon={<LoginIcon />}
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Login
                </Button>

                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  startIcon={<HowToRegIcon />}
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    background:
                      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                      boxShadow:
                        '0 6px 20px rgba(245, 87, 108, 0.4)',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Footer Component
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} BlogSpace. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 8,
        mb: 6,
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            fontWeight="800"
            gutterBottom
            sx={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Share Your Stories
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              opacity: 0.9,
              fontWeight: 300,
              mb: 4
            }}
          >
            Discover amazing content from our community
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

// Main Component
const Homepage = () => {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((s) => s.posts);

  useEffect(() => {
    dispatch(fetchPostsRequest({}));
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: '#f9fafb'
        }}
      >
        <Header />

        <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <HeroSection />

          {loading ? (
            <Box display="flex" justifyContent="center" my={8}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <CircularProgress size={60} thickness={4} />
              </motion.div>
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  mb: 4,
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                Latest Posts
              </Typography>

              {posts.length === 0 ? (
                <Paper
                  elevation={0}
                  sx={{
                    p: 6,
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: '2px dashed',
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No posts yet. Be the first to share!
                  </Typography>
                </Paper>
              ) : (
                <Box sx={{ display: 'grid', gap: 3 }}>
                  {posts.map((post, index) => (
                    <Grow in={true} timeout={(index + 1) * 300} key={post._id}>
                      <Card
                        component={motion.div}
                        whileHover={{
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        sx={{
                          borderRadius: 3,
                          overflow: 'hidden',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                          }
                        }}
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{
                                width: 56,
                                height: 56,
                                bgcolor: 'primary.main',
                                fontSize: '1.5rem'
                              }}
                            >
                              {post.author.name.charAt(0)}
                            </Avatar>
                          }
                          title={
                            <Typography variant="h6" fontWeight="600">
                              {post.title}
                            </Typography>
                          }
                          subheader={
                            <Typography variant="body2" color="primary">
                              By {post.author.name}
                            </Typography>
                          }
                          sx={{ pb: 1 }}
                        />
                        <CardContent>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              lineHeight: 1.7,
                              mb: 2,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {post.content}
                          </Typography>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="caption" color="text.disabled">
                              {new Date(post?.createdAt).toLocaleDateString()}
                            </Typography>
                            <Button
                              component={RouterLink}
                              to={`/post/${post._id}`}
                              variant="text"
                              color="primary"
                              sx={{
                                fontWeight: 600,
                                '&:hover': {
                                  bgcolor: 'transparent',
                                  textDecoration: 'underline'
                                }
                              }}
                            >
                              Read More →
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  ))}
                </Box>
              )}

              {posts.length > 0 && (
                <Box textAlign="center" mt={6} mb={4}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderRadius: 50,
                      px: 4,
                      py: 1.5,
                      borderWidth: 2,
                      fontWeight: 600
                    }}
                  >
                    Load More
                  </Button>
                </Box>
              )}
            </motion.div>
          )}
        </Container>

        <Footer />
      </Box>
    </>
  );
};

export default Homepage;