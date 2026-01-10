import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PrivateRoute from './middlewares/PrivateRoute';

const Dashboard = lazy(() => import('../pages/user/Dashboard'));
const Posts = lazy(() => import('../pages/user/Posts'));
const CreatePost = lazy(() => import('../pages/user/CreatePost'));

const ProtectedRoutes = () => (
    <Suspense fallback={<p>Loading...</p>}>
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/user" element={<Dashboard />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/create" element={<CreatePost />} />
                <Route path="/posts/edit/:id" element={<CreatePost />} />
            </Route>
        </Routes>
    </Suspense>
);

export default ProtectedRoutes;
