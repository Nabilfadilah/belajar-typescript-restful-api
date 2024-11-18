"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(status, message) {
        // kirim ke super constructor, message nya
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.ResponseError = ResponseError;
