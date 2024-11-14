import { ZodType } from "zod";

export class Validation {

    /* function validate generik type, skema dari ZodType, data yg divalidasi T
    dan retrunnya T lagi */
    static validate<T>(schema: ZodType, data: T) : T {
        // schemanya apa lalu parse datanya apa?
        return schema.parse(data)
    }
}