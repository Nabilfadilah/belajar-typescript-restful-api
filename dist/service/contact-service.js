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
exports.ContactService = void 0;
const contact_model_1 = require("../model/contact-model");
const contact_validation_1 = require("../validation/contact-validation");
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const logging_1 = require("../application/logging");
const response_error_1 = require("../error/response-error");
class ContactService {
    // user: User = itu mengharuskan user sudah login 
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(contact_validation_1.ContactValidation.CREATE, request);
            // object baru untuk mengambil username
            const record = Object.assign(Object.assign({}, createRequest), { username: user.username });
            // insert ke database
            // login 
            const contact = yield database_1.prismaClient.contact.create({
                data: record
            });
            logging_1.logger.debug("record : ", +JSON.stringify(contact));
            return (0, contact_model_1.toContactResponse)(contact);
        });
    }
    // repaktor code
    static checkContactMustExists(username, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield database_1.prismaClient.contact.findUnique({
                where: {
                    id: contactId,
                    username: username
                }
            });
            if (!contact) {
                throw new response_error_1.ResponseError(404, "Contact not found");
            }
            return contact;
        });
    }
    // get contact api
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // cek ke database apakah ada?
            const contact = yield this.checkContactMustExists(user.username, id);
            return (0, contact_model_1.toContactResponse)(contact);
        });
    }
    // update contact
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            // validasi datanya
            const updateRequest = validation_1.Validation.validate(contact_validation_1.ContactValidation.UPDATE, request);
            // cek apakah contact nya ada?
            yield this.checkContactMustExists(user.username, request.id);
            // update databasenya 
            const contact = yield database_1.prismaClient.contact.update({
                where: {
                    id: updateRequest.id,
                    username: user.username
                },
                data: updateRequest
            });
            return (0, contact_model_1.toContactResponse)(contact);
        });
    }
    // remove contact
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // cek apakah contact nya ada?
            yield this.checkContactMustExists(user.username, id);
            // delete datanya
            const contact = yield database_1.prismaClient.contact.delete({
                where: {
                    id: id,
                    username: user.username
                }
            });
            return (0, contact_model_1.toContactResponse)(contact);
        });
    }
    // search contact
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            // validasi
            const searchRequest = validation_1.Validation.validate(contact_validation_1.ContactValidation.SEARCH, request);
            // hitung untuk skip pagenya
            const skip = (searchRequest.page - 1) * searchRequest.size;
            // denamik query/filter
            const filters = [];
            // cek jika apakah name ada?
            if (searchRequest.name) {
                filters.push({
                    OR: [
                        {
                            first_name: {
                                contains: searchRequest.name
                            }
                        },
                        {
                            last_name: {
                                contains: searchRequest.name
                            }
                        }
                    ]
                });
            }
            // cek jika apakah email ada?
            if (searchRequest.email) {
                filters.push({
                    email: {
                        contains: searchRequest.email
                    }
                });
            }
            // cek jika apakah phone ada?
            if (searchRequest.phone) {
                filters.push({
                    phone: {
                        contains: searchRequest.phone
                    }
                });
            }
            // dapatkan datanya dari search username
            const contacts = yield database_1.prismaClient.contact.findMany({
                // hasil query 
                where: {
                    username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.contact.count({
                where: {
                    username: user.username,
                    AND: filters
                }
            });
            return {
                data: contacts.map(contact => (0, contact_model_1.toContactResponse)(contact)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
}
exports.ContactService = ContactService;
