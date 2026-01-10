import { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
  Stack,
  Chip,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  fetchUsersRequest,
  updateUserRoleRequest,
} from '../../features/admin/admin.slice';

const Users = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <Box minHeight="70vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

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
          <Button
            component={RouterLink}
            to="/admin"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 2 }}
          >
            Back
          </Button>

          <Typography variant="h6" fontWeight={800}>
            User Management
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ===== CONTENT ===== */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Users
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Manage user roles and access permissions
        </Typography>

        <Stack spacing={3}>
          {users.map((user) => (
            <Card
              key={user._id}
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
                  flexWrap="wrap"
                  gap={2}
                >
                  <Box>
                    <Typography fontWeight={600}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip
                      label={user.role}
                      color={user.role === 'ADMIN' ? 'primary' : 'default'}
                      sx={{ fontWeight: 600 }}
                    />

                    <Button
                      variant="outlined"
                      startIcon={<SwapHorizIcon />}
                      onClick={() =>
                        dispatch(
                          updateUserRoleRequest({
                            userId: user._id,
                            role:
                              user.role === 'ADMIN' ? 'USER' : 'ADMIN',
                          })
                        )
                      }
                    >
                      Toggle Role
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default Users;
