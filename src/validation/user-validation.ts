import {z, ZodType } from "zod";

export class UserValidation {

    // aturan untuk REGISTER tidak bisa diubah, tipenya ZodType, yang bentuknya objek
    static readonly REGISTER : ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1).max(100)
    })
    
    // login validatioin
    static readonly LOGIN : ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
    })
    
}