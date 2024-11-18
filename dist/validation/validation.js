"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
class Validation {
    /* function validate generik type, skema dari ZodType, data yg divalidasi T
    dan retrunnya T lagi */
    static validate(schema, data) {
        // schemanya apa lalu parse datanya apa?
        return schema.parse(data);
    }
}
exports.Validation = Validation;
