"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ZodError_1 = require("../errors/ZodError");
const mongooseError_1 = require("../errors/mongooseError");
const CastError_1 = require("../errors/CastError");
const duplicateError_1 = require("../errors/duplicateError");
const AppError_1 = require("../errors/AppError");
const AuthError_1 = require("../errors/AuthError");
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    let message = 'something went Wrong';
    let errorMessage = 'something went Wrong';
    let statusCode = 500;
    let error = err;
    let stack = error === null || error === void 0 ? void 0 : error.stack;
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        errorMessage = (0, ZodError_1.ZodErrorMessageGenerator)(err);
    }
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errorMessage = (0, mongooseError_1.MongooseErrorMessageGenerator)(err);
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID!';
        errorMessage = (0, CastError_1.CastErrorMessageGenerator)(err);
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        statusCode = 400;
        message = 'Duplicate Entry!';
        errorMessage = (0, duplicateError_1.DuplicateErrorMessageGenerator)(err);
    }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = 'BAD REQUEST!';
        errorMessage = err.message;
    }
    else if (err instanceof AuthError_1.AuthError) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessage =
            'You do not have the necessary permissions to access this resource.';
        error = null;
        stack = null;
    }
    else if (err instanceof Error) {
        message = 'Something Went Wrong!';
        errorMessage = err.message;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: error,
        stack: stack,
    });
};
exports.default = globalErrorHandler;
