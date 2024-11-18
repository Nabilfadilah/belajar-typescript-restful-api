"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user-service");
class UserController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // lakukan pemanggilan data service 
            try {
                // request dengan createUserRequest yang diambil dari body yang di konfersi ke createUserRequest
                const request = req.body;
                // kirim/simpan ke service dalam response
                const response = yield user_service_1.UserService.register(request);
                // dan response nya kita bentuk dalam json body sesuai api spec
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    // login user
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // lakukan pemanggilan data service 
            try {
                // request dengan LoginUserRequest yang diambil dari body yang di konfersi ke createUserRequest
                const request = req.body;
                // kirim/simpan ke service dalam response
                const response = yield user_service_1.UserService.login(request);
                // dan response nya kita bentuk dalam json body sesuai api spec
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    // get user yang sudah login
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // lakukan pemanggilan data service 
            try {
                // kirim/simpan ke service dalam response
                const response = yield user_service_1.UserService.get(req.user);
                // dan response nya kita bentuk dalam json body sesuai api spec
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    // update user
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // lakukan pemanggilan data service 
            try {
                const request = req.body;
                // kirim/simpan ke service dalam response
                const response = yield user_service_1.UserService.update(req.user, request);
                // dan response nya kita bentuk dalam json body sesuai api spec
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    // logout user
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // lakukan pemanggilan data service 
            try {
                // kirim/simpan ke user service
                yield user_service_1.UserService.logout(req.user);
                // dan response nya kita bentuk dalam json body sesuai api spec
                res.status(200).json({
                    data: "OK"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
