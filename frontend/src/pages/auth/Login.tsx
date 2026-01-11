import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { loginRequest } from '../../features/auth/auth.slice';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } =
    useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'ADMIN' ? '/admin' : '/user');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            textAlign="center"
            gutterBottom
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Sign in to continue to your dashboard
          </Typography>

          {/* Social Login (UI ONLY) */}
          <Box display="flex" gap={2} mb={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ borderRadius: 2 }}
              onClick={() => window.location.href = 'http://localhost:5000/api/v1/auth/google'}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ borderRadius: 2 }}
               onClick={() => window.location.href = 'http://localhost:5000/api/v1/auth/facebook'}
            >
              Facebook
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>or</Divider>

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Typography color="error" variant="body2" mt={1}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                borderRadius: 2,
                py: 1.4,
                fontWeight: 600,
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>

          {/* Footer Links */}
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={3}
          >
            Don’t have an account?{' '}
            <Typography
              component={RouterLink}
              to="/register"
              color="primary"
              fontWeight={600}
              sx={{ textDecoration: 'none' }}
            >
              Register
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
