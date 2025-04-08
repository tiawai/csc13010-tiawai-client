import { Role } from './user.type';

export interface UserSignUpDto {
    username: string;
    email: string;
    password: string;
    phone: string;
    birthdate: string;
    role: Role;
}
