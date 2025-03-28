export enum Role {
    GUEST = 'Guest',
    ADMIN = 'Admin',
    TEACHER = 'Teacher',
    STUDENT = 'Student',
}

export type User = {
    id?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;
    role?: Role | undefined;
};

export interface UserSignUpDto {
    username: string;
    email: string;
    password: string;
    phone: string;
    birthdate: string;
    role: Role;
}
