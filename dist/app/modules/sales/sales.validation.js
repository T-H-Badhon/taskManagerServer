"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleValidations = void 0;
const zod_1 = require("zod");
const saleValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        sellQuantity: zod_1.z.number(),
        buyerName: zod_1.z.string(),
        date: zod_1.z.string(),
    }),
});
exports.saleValidations = {
    saleValidationSchema,
};
