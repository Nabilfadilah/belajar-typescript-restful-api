import { User } from "@prisma/client";

// register user
export type UserResponse = {
    username: string;
    name: string;
    token?: string;
}

export type CreateUserRequest = {
    username: string;
    name: string;
    password: string; 
}

// login user
export type LoginUserRequest = {
    username: string;
    password: string; 
}

export function toUserResponse(user: User): UserResponse {
    return {
        name: user.name,
        username: user.username,
    }
}