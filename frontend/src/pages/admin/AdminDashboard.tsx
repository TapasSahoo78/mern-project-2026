import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Button,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import CommentIcon from '@mui/icons-material/Comment';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchStatsRequest } from '../../features/admin/admin.slice';
import { logout } from '../../features/auth/auth.slice';

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <Card
    sx={{
      borderRadius: 4,
      boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
      transition: '0.3s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
      },
    }}
  >
    <CardContent sx={{ p: 4 }}>
      <Box display="flex" alignItems="center" gap={3}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 3,
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={800}>
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchStatsRequest());
  }, [dispatch]);

  if (loading || !stats) {
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
          <Typography variant="h6" fontWeight={800} sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>

          <Button
            color="error"
            startIcon={<LogoutIcon />}
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ===== CONTENT ===== */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* ===== KPI CARDS ===== */}
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Overview
        </Typography>

        <Grid container spacing={4} mb={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <RouterLink to="/admin/users" style={{ textDecoration: 'none' }}>
            <StatCard
              title="Total Users"
              value={stats.users}
              icon={<PeopleIcon fontSize="large" />}
            />
            </RouterLink>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RouterLink to="/admin/posts" style={{ textDecoration: 'none' }}>
            <StatCard
              title="Total Posts"
              value={stats.posts}
              icon={<ArticleIcon fontSize="large" />}
            />
            </RouterLink>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RouterLink to="/admin/comments" style={{ textDecoration: 'none' }}>
            <StatCard
              title="Total Comments"
              value={stats.comments}
              icon={<CommentIcon fontSize="large" />}
            />
            </RouterLink>
          </Grid>
        </Grid>

        {/* ===== CHARTS ===== */}
        <Grid container spacing={4}>
          {/* Bar Chart */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Platform Statistics
                </Typography>

                <BarChart
                  xAxis={[
                    {
                      scaleType: 'band',
                      data: ['Users', 'Posts', 'Comments'],
                    },
                  ]}
                  series={[
                    {
                      data: [
                        stats.users,
                        stats.posts,
                        stats.comments,
                      ],
                    },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Content Distribution
                </Typography>

                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: stats.users, label: 'Users' },
                        { id: 1, value: stats.posts, label: 'Posts' },
                        { id: 2, value: stats.comments, label: 'Comments' },
                      ],
                    },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminDashboard;
