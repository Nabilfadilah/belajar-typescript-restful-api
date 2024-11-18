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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    // request dengan tipe CreateUserRequest, response Promise, dan UserResponse
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // validasi terlebih dahulu, data register user yang sudah tervalidasi
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            // cek username apakah sudah teregistrasi di database apa belum?
            const totalUserWithSameUsername = yield database_1.prismaClient.user.count({
                where: {
                    username: registerRequest.username
                }
            });
            // jika total yang pake username yang sama itu tidak sama dengan 0 
            if (totalUserWithSameUsername != 0) {
                // kalau ada maka akan error
                throw new response_error_1.ResponseError(400, "Username already exists");
            }
            // ubah data passwordnya, menggunakan bcrypt dengan hash passwordnya
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            // baru registrasikan user ini ke database
            const user = yield database_1.prismaClient.user.create({
                data: registerRequest
            });
            // kalau sukses, berati tinggal konfersi dari user menjadi userResponse
            // user dari prisma client itu balikannya sebuah type user dari prisma 
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    // login user
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            // cek ke database apakah usernya ada, kalau ada maka cek passwordnya apakah valid atau tidak
            // kalau valid maka buat tokennya dan balikan usernya 
            let user = yield database_1.prismaClient.user.findUnique({
                where: {
                    username: loginRequest.username
                }
            });
            if (!user) {
                throw new response_error_1.ResponseError(401, "Username or password is wrong");
            }
            // cek passwordnya jika valid
            // yang belum di hashing yaitu loginRequest.password, dan yang sudah hashing yaitu user.password 
            const isPasswordValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            // kalau tidak valid
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, "Username or password is wrong");
            }
            // ubah data tokenya
            user = yield database_1.prismaClient.user.update({
                where: {
                    username: loginRequest.username
                },
                // update datanya token
                // nanti otomatis data resultnya disimpan di variabel user
                data: {
                    token: (0, uuid_1.v4)()
                }
            });
            // response
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = user.token;
            return response;
        });
    }
    // get user yang sudah login
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // tinggal balikan to user response
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    // update user
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            if (updateRequest.name) {
                user.name = updateRequest.name;
            }
            if (updateRequest.password) {
                user.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
            }
            const result = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username
                },
                data: user
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    // logout user
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username
                },
                data: {
                    token: null
                }
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
}
exports.UserService = UserService;
