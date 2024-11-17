import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse, UpdateContactRequest } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";

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

    // repaktor code
    static async checkContactMustExists(username: string, contactId: number): Promise<Contact> {
        const contact = await prismaClient.contact.findUnique({
            where: {
                id: contactId,
                username: username
            }
        })

        if(!contact) {
            throw new ResponseError(404, "Contact not found")
        }

        return contact;
    }

    // get contact api
    static async get(user: User, id: number): Promise<ContactResponse> {
        // cek ke database apakah ada?
        const contact = await this.checkContactMustExists(user.username, id);

        return toContactResponse(contact);
    }

    // update contact
    static async update(user: User, request: UpdateContactRequest) : Promise<ContactResponse> {

        // validasi datanya
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request);

        // cek apakah contact nya ada?
        await this.checkContactMustExists(user.username, request.id);

        // update databasenya 
        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username
            },
            data: updateRequest
        })

        return toContactResponse(contact)
    }


}