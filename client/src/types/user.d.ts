export type Role = "guest" | "user" | "administrator";

export type User = {
    id?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;
    role?: Role | undefined;
};
