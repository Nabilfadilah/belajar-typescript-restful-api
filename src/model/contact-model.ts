import { Contact } from "@prisma/client"

// response
export type ContactResponse = {
    id: number,
    first_name: string,
    last_name?: string | null,
    email?: string | null,
    phone?: string | null
}

// request
export type CreateContactRequest = {
    first_name: string,
    last_name?: string,
    email?: string,
    phone?: string
}

// update contact
export type UpdateContactRequest = {
    id: number,
    first_name: string,
    last_name?: string,
    email?: string,
    phone?: string
}


// konpersi user prisma ke user client
export function toContactResponse(contact: Contact): ContactResponse {
    return {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone
    }
}