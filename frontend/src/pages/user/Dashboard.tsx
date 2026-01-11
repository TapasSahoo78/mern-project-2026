import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { logout } from '../../features/auth/auth.slice';

const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      {/* ===== HEADER ===== */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
          <Typography variant="h6" fontWeight={800} sx={{ flexGrow: 1 }}>
            User Dashboard
          </Typography>

          <Button
            startIcon={<LogoutIcon />}
            color="error"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ===== CONTENT ===== */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >
          Welcome 👋
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
        >
          Manage your posts and activities from here.
        </Typography>

        <Stack spacing={3}>
          {/* Add Post Card */}
          <Card
            variant="outlined"
            sx={{
              borderRadius: 3,
              transition: '0.3s',
              '&:hover': {
                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
              },
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Create a New Post
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Share your thoughts with the community
                  </Typography>
                </Box>

                <Button
                  component={RouterLink}
                  to="/posts/create"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Add Post
                </Button>



              </Box>
            </CardContent>
          </Card>

          {/* My Posts Card */}
          <Card
            variant="outlined"
            sx={{
              borderRadius: 3,
              transition: '0.3s',
              '&:hover': {
                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
              },
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    My Posts
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View and manage all your published posts
                  </Typography>
                </Box>

                <Button
                  component={RouterLink}
                  to="/posts/"
                  variant="outlined"
                  startIcon={<ArticleIcon />}
                >
                  View Posts
                </Button>
              </Box>
            </CardContent>
          </Card>


        </Stack>
      </Container>
    </>
  );
};

export default Dashboard;
