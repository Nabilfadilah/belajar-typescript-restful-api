"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
function toUserResponse(user) {
    return {
        name: user.name,
        username: user.username,
    };
}
// cara setup yang bener
// 1. model
// 2. service
// 3. controller
// 4. route
// 5. unit test
