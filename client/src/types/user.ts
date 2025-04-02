export enum Role {
    GUEST = 'Guest',
    ADMIN = 'Admin',
    TEACHER = 'Teacher',
    STUDENT = 'Student',
}

export interface IUser {
    id?: string;
    username?: string;
    email?: string;
    role: Role;
}

export class User implements IUser {
    id?: string;
    username?: string;
    email?: string;
    role: Role;

    constructor(role: Role = Role.GUEST, username?: string, email?: string) {
        this.id = undefined;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    static isAdmin(user: User): boolean {
        return user.role === Role.ADMIN;
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
}

export class UserSignUp extends User {
    password: string;
    phone: string;
    birthdate: string;

    constructor(
        username: string,
        email: string,
        password: string,
        phone: string,
        birthdate: string,
        role: Role,
    ) {
        super(role, username, email);
        this.password = password;
        this.phone = phone;
        this.birthdate = birthdate;
    }
}
