"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValitdations = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: 'usename is required' }),
        name: zod_1.z.string({ required_error: 'name is required' }),
        email: zod_1.z
            .string({ required_error: 'email is required' })
            .email({ message: 'invalid email' }),
        password: zod_1.z.string({ required_error: 'password is required' }).refine((password) => {
            const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
            return alphanumericRegex.test(password);
        }, {
            message: 'password must be alpaneumeric and minimum 6 characters long',
        }),
    }),
});
const loginCredentialValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: 'username is required' }),
        password: zod_1.z.string({ required_error: 'password is required' }),
    }),
});
exports.userValitdations = {
    userValidationSchema,
    loginCredentialValidationSchema,
};
