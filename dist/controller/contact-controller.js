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
exports.ContactController = void 0;
const contact_service_1 = require("../service/contact-service");
const logging_1 = require("../application/logging");
class ContactController {
    // create
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield contact_service_1.ContactService.create(req.user, request);
                logging_1.logger.debug("response : " + JSON.stringify(response));
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    // get 
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactId = Number(req.params.contactId);
                const response = yield contact_service_1.ContactService.get(req.user, contactId);
                logging_1.logger.debug("response : " + JSON.stringify(response));
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    // update 
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                // contact id
                request.id = Number(req.params.contactId);
                const response = yield contact_service_1.ContactService.create(req.user, request);
                logging_1.logger.debug("response : " + JSON.stringify(response));
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    // delete
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // contact id
                const contactId = Number(req.params.contactId);
                const response = yield contact_service_1.ContactService.remove(req.user, contactId);
                logging_1.logger.debug("response : " + JSON.stringify(response));
                res.status(200).json({
                    data: "OK"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    // search 
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // request 
                const request = {
                    name: req.query.name,
                    email: req.query.email,
                    phone: req.query.phone,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield contact_service_1.ContactService.search(req.user, request);
                logging_1.logger.debug("response : " + JSON.stringify(response));
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
exports.ContactController = ContactController;
