export interface DashboardStats {
    users: number;
    posts: number;
    comments: number;
}

export interface AdminUser {
    _id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
}

export interface AdminState {
    stats: DashboardStats | null;
    users: AdminUser[];
    comments:[],
    loading: boolean;
    error: string | null;
}
