import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchDashboardStatsApi = async (token: string) => {
  const res = await axios.get(`${API_URL}/v1/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchUsersApi = async (token: string) => {
  const res = await axios.get(`${API_URL}/v1/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUserRoleApi = async (
  userId: string,
  role: 'ADMIN' | 'USER',
  token: string
) => {
  const res = await axios.put(
    `${API_URL}/v1/admin/users/${userId}/role`,
    { role },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
