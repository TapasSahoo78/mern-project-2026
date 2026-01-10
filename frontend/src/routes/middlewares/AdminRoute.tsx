import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

const AdminRoute = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
