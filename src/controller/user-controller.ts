import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        // lakukan pemanggilan data service 
        try {
            // request dengan createUserRequest yang diambil dari body yang di konfersi ke createUserRequest
            const request: CreateUserRequest = req.body as CreateUserRequest;
            // kirim/simpan ke service dalam response
            const response = await UserService.register(request);
            // dan response nya kita bentuk dalam json body sesuai api spec
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
    
    // login user
    static async login(req: Request, res: Response, next: NextFunction) {
        // lakukan pemanggilan data service 
        try {
            // request dengan LoginUserRequest yang diambil dari body yang di konfersi ke createUserRequest
            const request: LoginUserRequest = req.body as LoginUserRequest;
            // kirim/simpan ke service dalam response
            const response = await UserService.login(request);
            // dan response nya kita bentuk dalam json body sesuai api spec
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
    
    // get user yang sudah login
    static async get(req: UserRequest, res: Response, next: NextFunction) {
        // lakukan pemanggilan data service 
        try {
            // kirim/simpan ke service dalam response
            const response = await UserService.get(req.user!);
            // dan response nya kita bentuk dalam json body sesuai api spec
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
    
    // update user
    static async update(req: UserRequest, res: Response, next: NextFunction) {
        // lakukan pemanggilan data service 
        try {
            const request: UpdateUserRequest = req.body as UpdateUserRequest;
            // kirim/simpan ke service dalam response
            const response = await UserService.update(req.user!, request);
            // dan response nya kita bentuk dalam json body sesuai api spec
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    // logout user
    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        // lakukan pemanggilan data service 
        try {
            // kirim/simpan ke user service
            await UserService.logout(req.user!);
            // dan response nya kita bentuk dalam json body sesuai api spec
            res.status(200).json({
                data: "OK"
            })
        } catch (e) {
            next(e)
        }
    }
}