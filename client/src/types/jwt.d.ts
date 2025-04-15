import 'jwt-decode';
import { Role } from './user.type';

declare module 'jwt-decode' {
    interface JwtPayload {
        id?: string;
        email?: string;
        username?: string;
        role?: Role;
    }
}
