import { Request, Response, NextFunction, json } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    // cek dulu errornya apa?
    if(error instanceof ZodError) {
        // validasi error kalau dari zod
        res.status(400).json({
            // error messagenya apa?
            // detailnya mau cek dari yang error 
            errors: `Validation Error : ${JSON.stringify(error)}`
        })
    // kalau error nya, kita  mau balikan apa?
    } else if(error instanceof ResponseError) {
        res.status(error.status).json({
            // errornya kita ambil dari message
            errors: error.message
        })
    } else {
        res.status(500).json({
            errors: error.message
        })
    }
}