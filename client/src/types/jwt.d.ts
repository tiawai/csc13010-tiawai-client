import "jwt-decode";

declare module "jwt-decode" {
    interface JwtPayload {
        id?: string;
        email?: string;
        username?: string;
        role?: string | null;
    }
}
