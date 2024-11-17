import {z, ZodType} from "zod"

export class ContactValidation {

    // sesuaikan dengaan requestnya dengan model di z.objeck 
    static readonly CREATE : ZodType = z.object({
        first_name: z.string().min(1).max(100),
        last_name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).email().optional(),
        phone: z.string().min(1).max(20).optional() 
    })
    
    // update
    static readonly UPDATE : ZodType = z.object({
        id: z.number().positive(),
        first_name: z.string().min(1).max(100),
        last_name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).email().optional(),
        phone: z.string().min(1).max(20).optional() 
    })
}