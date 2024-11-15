import { User } from "@prisma/client";
import { Request } from "express";

// bikin tipe khusus untuk datta user
export interface UserRequest extends Request {
    user?: User
}