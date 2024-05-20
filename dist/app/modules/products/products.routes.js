"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const ValidationFunction_1 = __importDefault(require("../../middlewares/ValidationFunction"));
const products_validation_1 = require("./products.validation");
const products_controllers_1 = require("./products.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/add-product', (0, auth_1.default)(), (0, ValidationFunction_1.default)(products_validation_1.productValidations.productValidationSchema), products_controllers_1.productControllers.addProduct);
router.get('/', (0, auth_1.default)(), products_controllers_1.productControllers.getProduct);
router.delete('/delete', (0, auth_1.default)(), products_controllers_1.productControllers.deleteProducts); // user just marks products and seleted products ids are added to deleteIdsArray automatically . So , I feel no need to validate this array
exports.productRoutes = router;
