import {z, ZodType} from "zod"

export class AddressValidation {

    static readonly CREATE : ZodType = z.object({
        contact_id: z.number().positive(),
        street: z.string().min(1).max(225).optional(),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(100),
        postal_code: z.string().min(1).max(10)
    })

    // get address
    static readonly GET : ZodType = z.object({
        contact_id: z.number().positive(),
        id: z.number().positive()
    })
}