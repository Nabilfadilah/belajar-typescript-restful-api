import { User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";

export class ContactService {
    
    // user: User = itu mengharuskan user sudah login 
    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        const createRequest = Validation.validate(ContactValidation.CREATE, request);

        // object baru untuk mengambil username
        const record = {
            // semua yang di atribute createRequest
            ...createRequest,
            // saya tambahkan atribute baru yaitu user yang isinya username
            ...{username: user.username}
        }

        // insert ke database
        // login 
        const contact = await prismaClient.contact.create({
            data: record
        })

        logger.debug("record : ", + JSON.stringify(contact))
        return toContactResponse(contact)
    }
}