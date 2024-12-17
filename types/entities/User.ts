export type User = {
    id: string;
    username: string;
    role: 'ADMIN' | 'USER';
    token: string;
}