export enum Role {
    GUEST = 'Guest',
    ADMIN = 'Admin',
    TEACHER = 'Teacher',
    STUDENT = 'Student',
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
    profileImage?: string;
    phone?: string;
    birthdate?: string;
    gender?: 'male' | 'female' | null;
    address?: string;
}

export interface UpdateUserDto {
    username?: string;
    email?: string;
    phone?: string;
    birthdate?: string;
    gender?: 'male' | 'female' | null;
    address?: string;
}

export interface UpdateUserProfileResponseDTO {
    message: string;
    user: {
        id: string;
        username: string;
        email: string;
        phone?: string;
        birthdate?: string;
        profileImage?: string;
    };
}

export class UserUtils {
    static initUser(id = '', username = '', email = '', role: Role): User {
        return { id, username, email, role };
    }

    static initGuest(): User {
        return { id: '', username: '', email: '', role: Role.GUEST };
    }

    static getRoleName(user: User): string {
        const roleNames: Record<Role, string> = {
            [Role.ADMIN]: 'Quản trị viên',
            [Role.TEACHER]: 'Giáo viên',
            [Role.STUDENT]: 'Học sinh',
            [Role.GUEST]: 'Khách',
        };
        return roleNames[user.role];
    }

    static isAdmin(user: User): boolean {
        return user.role === Role.ADMIN;
    }
}
