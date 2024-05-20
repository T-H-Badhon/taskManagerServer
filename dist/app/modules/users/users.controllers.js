"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utilities/catchAsync"));
const response_1 = __importDefault(require("../../utilities/response"));
const users_sevices_1 = require("./users.sevices");
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield users_sevices_1.userServices.registerUser(userData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginCredential = req.body;
    const result = yield users_sevices_1.userServices.loginUser(loginCredential);
    (0, response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User login successful',
        data: result,
    });
}));
exports.userControllers = {
    registerUser,
    loginUser,
};
