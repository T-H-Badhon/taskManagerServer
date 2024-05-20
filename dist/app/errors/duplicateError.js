"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateErrorMessageGenerator = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DuplicateErrorMessageGenerator = (err) => {
    const firstProperty = Object.keys(err.keyValue)[0];
    return `${firstProperty} already exsist!`;
};
exports.DuplicateErrorMessageGenerator = DuplicateErrorMessageGenerator;
// here only title is unique.
//So we can directly use "title already exsist!"
// But here i use dynamic system
