import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AdminRoute from './middlewares/AdminRoute';

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const Users = lazy(() => import('../pages/admin/Users'));

const AdminRoutes = () => (
    <Suspense fallback={<p>Loading...</p>}>
        <Routes>
            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<Users />} />
            </Route>
        </Routes>
    </Suspense>
);

export default AdminRoutes;

