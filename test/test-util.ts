import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
export class UserTest {

    static async delete() {
        // selesai unit test akan delete terus
        // deleteMany liat dulu datanya apakah ada?
        await prismaClient.user.deleteMany({
            // akan selalu delete data usernama nya adalah "test"
            where: {
                username: "test"
            }
        })
    }

    // untuk login user
    static async create(){
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: await bcrypt.hash("test", 10),
                token: "test"
            }
        })
    }
}