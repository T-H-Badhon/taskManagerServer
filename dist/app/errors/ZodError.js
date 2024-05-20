"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodErrorMessageGenerator = void 0;
const ZodErrorMessageGenerator = (err) => {
    let errorMessage = '';
    err.issues.forEach((issue) => (errorMessage = errorMessage + ` ${issue.message}.`));
    return errorMessage;
};
exports.ZodErrorMessageGenerator = ZodErrorMessageGenerator;
