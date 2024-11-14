import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"

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
}