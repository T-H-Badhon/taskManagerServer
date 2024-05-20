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
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../../config/config");
const AppError_1 = require("../../errors/AppError");
const hashedPassword_1 = require("../../utilities/hashedPassword");
const matchPassword_1 = require("../../utilities/matchPassword");
const users_model_1 = require("./users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    userData.password = yield (0, hashedPassword_1.hashedPassword)(userData.password);
    const user = yield users_model_1.User.create(userData);
    const result = yield users_model_1.User.findById(user._id).select('-password -__v ');
    return result;
});
const loginUser = (loginCredential) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = loginCredential;
    const loginUser = yield users_model_1.User.findOne({ username }).select('+password');
    if (loginUser) {
        const isMatched = yield (0, matchPassword_1.matchPassword)(password, loginUser.password);
        if (!isMatched) {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'password not matched');
        }
        const tokenInfo = {
            _id: loginUser._id,
            username: loginUser.username,
        };
        const token = jsonwebtoken_1.default.sign(tokenInfo, config_1.config.access_secrate, {
            expiresIn: '1h',
        });
        const result = {
            token,
        };
        return result;
    }
    else {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'user not found');
    }
});
exports.userServices = {
    registerUser,
    loginUser,
};
