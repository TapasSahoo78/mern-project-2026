// import { Routes, Route } from 'react-router-dom';
// import { lazy, Suspense } from 'react';
// import AdminRoute from './middlewares/AdminRoute';

// const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
// const Users = lazy(() => import('../pages/admin/Users'));

// const AdminRoutes = () => (
//     <Suspense fallback={<p>Loading...</p>}>
//         <Routes>
//             <Route element={<AdminRoute />}>
//                 <Route path="/admin" element={<AdminDashboard />} />
//                 <Route path="/admin/users" element={<Users />} />
//             </Route>
//         </Routes>
//     </Suspense>
// );

// export default AdminRoutes;


import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AdminRoute from './middlewares/AdminRoute';

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const Users = lazy(() => import('../pages/admin/Users_old'));
const Posts = lazy(() => import('../pages/admin/Posts'));
const Comments = lazy(() => import('../pages/admin/Comments'));

const AdminRoutes = () => (
    <Suspense fallback={<p>Loading...</p>}>
        <Routes>
            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/posts" element={<Posts />} />
                <Route path="/admin/comments" element={<Comments />} />
            </Route>
        </Routes>
    </Suspense>
);

export default AdminRoutes;

