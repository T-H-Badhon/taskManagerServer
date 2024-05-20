"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const ValidationFunction_1 = __importDefault(require("../../middlewares/ValidationFunction"));
const sales_validation_1 = require("./sales.validation");
const sales_controllers_1 = require("./sales.controllers");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(), (0, ValidationFunction_1.default)(sales_validation_1.saleValidations.saleValidationSchema), sales_controllers_1.saleControllers.saleProduct);
router.get('/', (0, auth_1.default)(), sales_controllers_1.saleControllers.saleReport);
exports.salesRoutes = router;
