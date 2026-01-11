import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { oauthLoginSuccess } from '../../features/auth/auth.slice';

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (!token) {
            navigate('/login');
            return;
        }

        // update redux
        dispatch(oauthLoginSuccess({ accessToken: token }));

        // redirect to dashboard/home
        navigate('/user');
    }, [dispatch, navigate]);

    return <p>Signing you in…</p>;
};

export default OAuthSuccess;
