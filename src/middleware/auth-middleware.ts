import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";

// auth middleware
export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction)  => {
    // ambil token dari request dari header
    const token = req.get('X-API-TOKEN');

    if (token) {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        })
        
        // kalau usernya ada mau ngapain?
        if (user) {
            req.user = user;
            next()
            return
        }
    }


    res.status(401).json({
        errors: "Unauthorized"
    }).end();
}