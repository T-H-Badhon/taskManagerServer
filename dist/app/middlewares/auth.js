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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utilities/catchAsync"));
const AppError_1 = require("../errors/AppError");
const config_1 = require("../config/config");
const AuthError_1 = require("../errors/AuthError");
const users_model_1 = require("../modules/users/users.model");
const auth = () => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AuthError_1.AuthError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.config.access_secrate);
        }
        catch (err) {
            throw new AuthError_1.AuthError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
        }
        const { _id } = decoded;
        const loginUser = yield users_model_1.User.findById(_id);
        if (!loginUser) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'This user is not found !');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
