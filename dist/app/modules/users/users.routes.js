"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const ValidationFunction_1 = __importDefault(require("../../middlewares/ValidationFunction"));
const users_validation_1 = require("./users.validation");
const users_controllers_1 = require("./users.controllers");
const router = (0, express_1.Router)();
router.post('/register', (0, ValidationFunction_1.default)(users_validation_1.userValitdations.userValidationSchema), users_controllers_1.userControllers.registerUser);
router.post('/login', (0, ValidationFunction_1.default)(users_validation_1.userValitdations.loginCredentialValidationSchema), users_controllers_1.userControllers.loginUser);
exports.userRoutes = router;
