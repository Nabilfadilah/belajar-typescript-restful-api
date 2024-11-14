import { prismaClient } from "../src/application/database";

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
}