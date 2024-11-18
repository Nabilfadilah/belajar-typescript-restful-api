import { Contact, User } from "@prisma/client";
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

    // untuk mendapatkan data user
    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                username: "test"
            }
        })

        // jika tidak ketemu data usernya
        if (!user) {
            throw new Error("User is not found")
        }

        return user;
    }    
}

export class ContactTest {

    // untuk menghapus semua contact
    static async deleteAll() {
        await prismaClient.contact.deleteMany({
            where: {
                username: "test"
            }
        })
    } 

    // get contact
    static async create(){
        await prismaClient.contact.create({
            data: {
                first_name: "test",
                last_name: "test",
                email: "test@example.com",
                phone: "08999999",
                username: "test"
            }
        })
    }

    static async get(): Promise<Contact> {
        const contact = await prismaClient.contact.findFirst({
            where: {
                username: "test"
            }
        })

        // jika kontack nya tidak ada
        if (!contact) {
            throw new Error("Contact is not found")
        }

        return contact;
    }
}

// address utils
export class AddressTest {
    static async deleteAll() {
        await prismaClient.address.deleteMany({
            where: {
                contact: {
                    username: "test"
                }
            }
        })
    }
}