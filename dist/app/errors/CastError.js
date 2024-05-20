"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastErrorMessageGenerator = void 0;
const CastErrorMessageGenerator = (err) => {
    const errorMessage = `${err.value} is not a valid ID!`;
    return errorMessage;
};
exports.CastErrorMessageGenerator = CastErrorMessageGenerator;
