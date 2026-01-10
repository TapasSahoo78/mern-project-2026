import { useState } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { registerRequest } from '../../features/auth/auth.slice';

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerRequest({ name, email, password }));
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
            Create Account
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Join our community and start sharing your ideas
          </Typography>

          {/* Social signup (UI ONLY) */}
          <Box display="flex" gap={2} mb={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ borderRadius: 2 }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ borderRadius: 2 }}
            >
              Facebook
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>or</Divider>

          {/* Register Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Email Address"
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
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                'Create Account'
              )}
            </Button>
          </Box>

          {/* Footer link */}
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={3}
          >
            Already have an account?{' '}
            <Typography
              component={RouterLink}
              to="/login"
              color="primary"
              fontWeight={600}
              sx={{ textDecoration: 'none' }}
            >
              Login
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
