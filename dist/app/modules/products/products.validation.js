"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidations = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required!' }),
        price: zod_1.z.number({
            required_error: 'price is required!',
            invalid_type_error: 'price must be in number!',
        }),
        quantity: zod_1.z.number({ required_error: 'quantity is required!' }),
        sportsType: zod_1.z.string({ required_error: 'sports type is required!' }),
        brand: zod_1.z.string({ required_error: 'brand is required!' }),
        size: zod_1.z
            .number({ invalid_type_error: 'size must be in number!' })
            .optional(),
        material: zod_1.z.string({ required_error: 'material is required!' }),
        color: zod_1.z.string({ required_error: 'color is required!' }),
        condition: zod_1.z.enum(['new', 'used']),
        weight: zod_1.z
            .number({ invalid_type_error: 'weight must be in number!' })
            .optional(), // it's an additional information not  mandatory
    }),
});
exports.productValidations = {
    productValidationSchema,
};
