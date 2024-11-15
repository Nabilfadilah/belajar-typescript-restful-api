import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, toUserResponse, UpdateUserRequest, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

export class UserService {

    // request dengan tipe CreateUserRequest, response Promise, dan UserResponse
    static async register(request: CreateUserRequest) : Promise<UserResponse> {
        // validasi terlebih dahulu, data register user yang sudah tervalidasi
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        // cek username apakah sudah teregistrasi di database apa belum?
        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        });

        // jika total yang pake username yang sama itu tidak sama dengan 0 
        if(totalUserWithSameUsername != 0) {
            // kalau ada maka akan error
            throw new ResponseError(400, "Username already exists")
        }

        // ubah data passwordnya, menggunakan bcrypt dengan hash passwordnya
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        // baru registrasikan user ini ke database
        const user = await prismaClient.user.create({
            data: registerRequest
        })

        // kalau sukses, berati tinggal konfersi dari user menjadi userResponse
        // user dari prisma client itu balikannya sebuah type user dari prisma 
        return toUserResponse(user);
    }

    // login user
    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        // cek ke database apakah usernya ada, kalau ada maka cek passwordnya apakah valid atau tidak
        // kalau valid maka buat tokennya dan balikan usernya 
        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        })

        if(!user) {
            throw new ResponseError(401, "Username or password is wrong");
        }

        // cek passwordnya jika valid
        // yang belum di hashing yaitu loginRequest.password, dan yang sudah hashing yaitu user.password 
        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

        // kalau tidak valid
        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password is wrong");
        }

        // ubah data tokenya
        user = await prismaClient.user.update({
            where: {
                username: loginRequest.username
            },
            // update datanya token
            // nanti otomatis data resultnya disimpan di variabel user
            data: {
                token: uuid()
            }
        })

        // response
        const response = toUserResponse(user);
        response.token = user.token!;
        return response;
    }

    // get user yang sudah login
    static async get(user: User): Promise<UserResponse> {
        // tinggal balikan to user response
        return toUserResponse(user);
    }

    // update user
    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);

        if (updateRequest.name) {
            user.name = updateRequest.name
        }

        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10)
        }

        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: user
        })

        return toUserResponse(result)
    }
}