"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseErrorMessageGenerator = void 0;
const MongooseErrorMessageGenerator = (err) => {
    return err.message;
};
exports.MongooseErrorMessageGenerator = MongooseErrorMessageGenerator;
