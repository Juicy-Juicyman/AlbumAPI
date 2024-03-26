/**
 * JSON-token types
 */

export type JwtPayLoad = {
    sub: number;
    firstName: string;
    lastName: string;
    email: string;
};

export type JwtRefPayLoad = Pick<JwtPayLoad, "sub">;


