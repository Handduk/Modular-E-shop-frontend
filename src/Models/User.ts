export type User = {
    id: number;
    name: string;
    email: string;
    passwordHash?: string;
    role: string;
};