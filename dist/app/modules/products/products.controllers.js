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
exports.productControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utilities/catchAsync"));
const response_1 = __importDefault(require("../../utilities/response"));
const products_services_1 = require("./products.services");
const addProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    const id = req.user._id;
    const result = yield products_services_1.productServices.addProduct(productData, id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Product added successfully',
        data: result,
    });
}));
const getProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield products_services_1.productServices.getProducts(query);
    (0, response_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Products fetched successfully',
        data: result,
    });
}));
const deleteOne = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const result = yield products_services_1.productServices.deleteOne(productId);
    (0, response_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Product deleted successfully',
        data: result,
    });
}));
const deleteProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const result = yield products_services_1.productServices.deleteProducts(id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Products deleted successfully',
        data: result,
    });
}));
exports.productControllers = {
    addProduct,
    getProduct,
    deleteOne,
    deleteProducts,
};
