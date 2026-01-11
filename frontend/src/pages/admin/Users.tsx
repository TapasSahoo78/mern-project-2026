import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Stack,
    Chip,
} from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchUsersRequest, updateUserRoleRequest } from '../../features/admin/admin.slice';

const Users = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((s) => s.admin);

    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, [dispatch]);

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" fontWeight={800} mb={3}>
                User Management
            </Typography>

            <Stack spacing={2}>
                {users.map((u) => (
                    <Card key={u._id}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Typography fontWeight={600}>{u.name}</Typography>
                                <Typography variant="body2">{u.email}</Typography>
                            </div>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <Chip label={u.role} color={u.role === 'ADMIN' ? 'success' : 'default'} />
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() =>
                                        dispatch(updateUserRoleRequest({
                                            userId: u._id,
                                            role: u.role === 'ADMIN' ? 'USER' : 'ADMIN',
                                        }))
                                    }
                                >
                                    Toggle Role
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default Users;
