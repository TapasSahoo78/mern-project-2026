import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import AdminRoutes from './AdminRoutes';

const AppRoutes = () => (
  <BrowserRouter>
    <PublicRoutes />
    <ProtectedRoutes />
    <AdminRoutes />
  </BrowserRouter>
);

export default AppRoutes;
