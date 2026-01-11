import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';

const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Homepage = lazy(() => import('../pages/Homepage'));
const PostDetails = lazy(() => import('../pages/user/PostDetails'));
const OAuthSuccess = lazy(() => import('../pages/auth/OAuthSuccess'));

const PublicRoutes = () => {
    const { isAuthenticated, user } = useAppSelector((s) => s.auth);
    const location = useLocation();

    // Only redirect when user is on PUBLIC pages
    const publicPaths = ['/login', '/register'];

    if (
        isAuthenticated &&
        user?.role === 'ADMIN' &&
        publicPaths.includes(location.pathname)
    ) {
        return <Navigate to="/admin" replace />;
    }

    if (
        isAuthenticated &&
        user?.role === 'USER' &&
        publicPaths.includes(location.pathname)
    ) {
        return <Navigate to="/user" replace />;
    }

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post/:id" element={<PostDetails />} />

                <Route path="/oauth-success" element={<OAuthSuccess />} />
            </Routes>
        </Suspense>
    );
};

export default PublicRoutes;
